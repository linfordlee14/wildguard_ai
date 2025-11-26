"""
Simple fallback agents system without external dependencies
"""
import os
from datetime import datetime

class SimpleWildGuardAgents:
    """Fallback agent system with simulated responses"""
    
    def __init__(self):
        self.model = "simulated"
        
    def planner_agent(self, wildlife_data, hotspots, alerts):
        """Strategic planning agent - simulated response"""
        return f"""
TACTICAL DEPLOYMENT PLAN - {datetime.now().strftime('%Y-%m-%d %H:%M')}

PRIORITY ZONES:
1. Northern Ridge (High Risk) - Deploy 2 ranger teams immediately
2. Eastern Valley (Medium Risk) - Position 1 mobile patrol unit

RESOURCE ALLOCATION:
- 4 rangers for immediate deployment
- 2 night-vision units for dusk patrol
- 1 rapid-response team on standby

IMMEDIATE ACTIONS:
- Establish checkpoint at main access road
- Activate camera surveillance in hotspot zones
- Begin coordinated sweep of high-risk areas

TIMELINE: Execute within 2 hours of briefing
"""

    def movement_analyst_agent(self, movement_alerts):
        """Movement analysis agent - simulated response"""
        return f"""
MOVEMENT PATTERN ANALYSIS

ANOMALY ASSESSMENT:
- {len(movement_alerts)} movement alerts detected
- Pattern suggests potential human interference
- Animals showing stress indicators (sudden stops, erratic movement)

BEHAVIORAL INDICATORS:
- Deviation from normal grazing patterns
- Clustering behavior indicating external threat
- Reduced movement during typical active hours

RECOMMENDATIONS:
- Increase monitoring frequency in affected zones
- Deploy additional camera traps along movement corridors
- Consider temporary ranger presence in anomaly areas
"""

    def vision_analyst_agent(self, image_findings):
        """Vision analysis agent - simulated response"""
        return f"""
VISUAL EVIDENCE ASSESSMENT

THREAT INDICATORS DETECTED:
- Fresh vehicle tracks near wildlife areas
- Human presence in restricted zones
- Equipment/tools suggesting poaching activity

EVIDENCE QUALITY: High confidence in threat assessment
RECOMMENDED ACTIONS:
- Immediate ranger deployment to affected areas
- Forensic documentation of evidence
- Coordinate with anti-poaching units

PRIORITY LEVEL: HIGH - Immediate response required
"""

    def risk_scoring_agent(self, movement_alerts, vision_findings, risk_score):
        """Risk assessment agent - simulated response"""
        return f"""
RISK VALIDATION ANALYSIS

CURRENT SCORE: {risk_score}/100 - VALIDATED
CONFIDENCE LEVEL: 85%

ASSESSMENT FACTORS:
- Movement anomalies: {len(movement_alerts)} detected
- Visual evidence: {len(vision_findings)} items
- Environmental factors: Dry season (elevated risk)

SCORE ADJUSTMENT: Current score appears accurate
RECOMMENDATION: Maintain current threat level assessment
"""

    def report_generator_agent(self, alerts, risk_score, analysis_results):
        """Report generation agent - simulated response"""
        return f"""
RANGER BRIEFING REPORT
Generated: {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}

EXECUTIVE SUMMARY:
Current threat level: {'CRITICAL' if risk_score >= 70 else 'HIGH' if risk_score >= 40 else 'MEDIUM'}
Active alerts: {len(alerts)}
Recommended action: Immediate deployment

DEPLOYMENT RECOMMENDATIONS:
1. Deploy rangers to Northern Ridge hotspot (Priority 1)
2. Establish mobile patrols in Eastern Valley
3. Activate night surveillance systems

RESOURCE REQUIREMENTS:
- 4-6 rangers for immediate response
- 2 vehicles for patrol operations
- Night-vision equipment for dusk operations

NEXT BRIEFING: 6 hours or upon significant developments
"""

    def orchestrate_agents(self, wildlife_data, hotspots, movement_alerts, vision_findings, risk_score):
        """Coordinate all agents for comprehensive analysis"""
        
        # Run all agent analyses
        planning_analysis = self.planner_agent(wildlife_data, hotspots, movement_alerts)
        movement_analysis = self.movement_analyst_agent(movement_alerts)
        vision_analysis = self.vision_analyst_agent(vision_findings)
        risk_analysis = self.risk_scoring_agent(movement_alerts, vision_findings, risk_score)
        
        analysis_results = {
            'planning': planning_analysis,
            'movement': movement_analysis,
            'vision': vision_analysis,
            'risk_assessment': risk_analysis,
            'summary': f"Simulated multi-agent analysis completed with {len(movement_alerts)} alerts processed"
        }
        
        final_report = self.report_generator_agent(movement_alerts, risk_score, analysis_results)
        
        return {
            'agent_analyses': analysis_results,
            'final_report': final_report,
            'timestamp': datetime.utcnow().isoformat(),
            'agents_used': ['planner', 'movement_analyst', 'vision_analyst', 'risk_scorer', 'report_generator'],
            'mode': 'simulated'
        }

# Global instance for fallback
simple_wildguard_agents = SimpleWildGuardAgents()