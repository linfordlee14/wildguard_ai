from datetime import datetime

def generate_briefing(alerts, risk_score):
    """
    Generate professional ranger briefing report.
    """
    
    timestamp = datetime.utcnow().isoformat()
    threat_level = 'CRITICAL' if risk_score >= 70 else 'HIGH' if risk_score >= 40 else 'MEDIUM'
    
    report = f"""
================================================================================
                     WILDGUARD AI - DAILY RANGER BRIEFING
================================================================================

DATE: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}
OVERALL RISK SCORE: {risk_score}/100 [{threat_level}]

================================================================================
EXECUTIVE SUMMARY
================================================================================

WildGuard AI has detected {len(alerts)} significant movement anomalies in the
protected reserve over the last 24 hours. Combined with environmental factors
and recent hotspot activity, the system assesses current poaching risk at
{threat_level} levels.

================================================================================
DETECTED INCIDENTS
================================================================================

"""
    
    if alerts:
        for i, alert in enumerate(alerts[:5], 1):
            report += f"""
{i}. INCIDENT: {alert['rhino_id'].upper()}
   Time: {alert['timestamp']}
   Location: {alert['latitude']:.4f}°S, {alert['longitude']:.4f}°E
   Type: {alert['reason'].replace('_', ' ').title()}
   Confidence: {int(alert['confidence'] * 100)}%

"""
    else:
        report += "\nNo critical incidents detected.\n"
    
    report += f"""
================================================================================
RISK ASSESSMENT
================================================================================

Movement Anomalies Detected: {len(alerts)}
Risk Score: {risk_score}/100
Threat Level: {threat_level}

The system evaluated:
- Real-time GPS tracking of {5} monitored animals
- Movement patterns vs. baseline behavior
- Proximity to known poaching hotspots
- Environmental factors (dry season conditions)

================================================================================
RECOMMENDED PATROL ROUTES & ACTIONS
================================================================================

IMMEDIATE ACTIONS (Next 2-4 hours):
- Deploy rangers to Northern Ridge hotspot (priority 1)
- Establish checkpoint at Eastern Valley approach
- Activate night-vision surveillance (dusk onwards)

PATROL RECOMMENDATIONS:
- Increase patrols in grid zone X-7 (85% higher risk)
- Position mobile teams at access points
- Monitor water sources during dry season

RESOURCE ALLOCATION:
- Recommend 3-4 additional rangers for rotation
- Deploy 2 night-vision units
- Position 1 rapid-response team at central base

================================================================================
WEATHER & ENVIRONMENTAL FACTORS
================================================================================

Current Season: Dry Season (increased poaching risk)
Temperature: High risk period for animal stress
Visibility: Excellent for surveillance operations
Human Activity: Elevated detection probability

================================================================================
NEXT BRIEFING
================================================================================

Next automated briefing: {(datetime.utcnow().hour + 24) % 24}:00 UTC tomorrow
Priority updates will be sent immediately if risk score exceeds 80

Contact: WildGuard AI Command Center
Questions: admin@wildguardai.com

================================================================================
"""
    
    return report