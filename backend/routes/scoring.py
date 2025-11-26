def compute_score(movement_alerts, vision_findings, hotspots):
    """
    Compute overall risk score 0-100 using weighted factors.
    
    Weights:
    - Movement alerts: 40%
    - Vision findings: 35%
    - Hotspot proximity: 15%
    - Environment: 10%
    """
    
    # Movement score (0-100)
    movement_score = min(len(movement_alerts) * 10, 100)
    
    # Vision score (0-100)
    vision_score = 0
    for finding in vision_findings:
        severity = finding.get('severity', 0)
        vision_score += severity * 100
    vision_score = min(vision_score, 100)
    
    # Hotspot proximity score
    hotspot_score = 30 if len(movement_alerts) > 0 else 0
    
    # Environment score (simulated weather, season)
    environment_score = 15  # Dry season = higher risk
    
    # Weighted calculation
    total_score = (
        movement_score * 0.40 +
        vision_score * 0.35 +
        hotspot_score * 0.15 +
        environment_score * 0.10
    )
    
    risk_score = int(min(total_score, 100))
    
    # Determine threat level
    if risk_score >= 70:
        threat_level = 'CRITICAL'
    elif risk_score >= 40:
        threat_level = 'HIGH'
    else:
        threat_level = 'MEDIUM'
    
    # Generate recommendations
    recommendations = []
    if risk_score >= 70:
        recommendations.extend([
            'URGENT: Deploy rangers to hotspot zones immediately',
            'Activate night-vision surveillance in critical areas',
            'Notify regional anti-poaching unit for backup'
        ])
    elif risk_score >= 40:
        recommendations.extend([
            'Increase patrol frequency in monitored zones',
            'Deploy additional rangers at dusk',
            'Review movement patterns for coordinated response'
        ])
    else:
        recommendations.extend([
            'Continue standard monitoring protocols',
            'Maintain data collection for pattern analysis',
            'Schedule routine ranger patrols'
        ])
    
    return {
        'risk_score': risk_score,
        'threat_level': threat_level,
        'justification': f'Based on {len(movement_alerts)} movement alerts and {len(vision_findings)} visual findings during dry season conditions.',
        'recommendations': recommendations
    }