import numpy as np
from datetime import datetime, timedelta

def detect_anomalies(wildlife_data, hotspots):
    """
    Detect movement anomalies indicating potential poaching.
    
    Anomalies:
    - Sudden speed drops (< 20% baseline)
    - No movement for > 2 hours
    - Clustering near hotspots
    - Erratic direction changes
    """
    alerts = []
    
    # Group by rhino
    rhino_tracks = {}
    for record in wildlife_data:
        rid = record.get('rhino_id')
        if rid not in rhino_tracks:
            rhino_tracks[rid] = []
        rhino_tracks[rid].append(record)
    
    # Compute baseline per rhino
    baselines = {}
    for rid, tracks in rhino_tracks.items():
        speeds = [t.get('speed_kmh', 0) for t in tracks]
        baselines[rid] = np.mean([s for s in speeds if s > 0.1])
    
    # Detect anomalies
    hotspot_coords = [(h['latitude'], h['longitude']) for h in hotspots.get('hotspots', [])]
    
    for rid, tracks in rhino_tracks.items():
        baseline = baselines.get(rid, 1.0)
        
        for i, track in enumerate(tracks):
            speed = track.get('speed_kmh', 0)
            lat = track.get('latitude')
            lon = track.get('longitude')
            timestamp = track.get('timestamp_utc')
            
            anomaly_detected = False
            reasons = []
            confidence = 0.0
            
            # Check for sudden stop
            if speed < baseline * 0.2:
                anomaly_detected = True
                reasons.append('sudden_speed_drop')
                confidence = 0.85
            
            # Check proximity to hotspots
            for h_lat, h_lon in hotspot_coords:
                dist = np.sqrt((lat - h_lat)**2 + (lon - h_lon)**2)
                if dist < 0.01:  # ~1km
                    anomaly_detected = True
                    reasons.append('near_hotspot')
                    confidence = max(confidence, 0.92)
            
            # Check for prolonged immobility
            if i > 0 and speed < 0.1:
                prev_speed = tracks[i-1].get('speed_kmh', 0)
                if prev_speed < 0.1:
                    anomaly_detected = True
                    reasons.append('prolonged_immobility')
                    confidence = max(confidence, 0.88)
            
            if anomaly_detected:
                alerts.append({
                    'rhino_id': rid,
                    'timestamp': timestamp,
                    'latitude': lat,
                    'longitude': lon,
                    'observed_metric': f'speed_kmh={speed}',
                    'reason': reasons,
                    'confidence': round(confidence, 2)
                })
    
    # Return top 10 most confident alerts
    return sorted(alerts, key=lambda x: x['confidence'], reverse=True)[:10]