from . import movement, scoring, report

# Try to import agents, fallback to simple agents if not available
try:
    from utils.agents import wildguard_agents
    AGENTS_AVAILABLE = True
    AGENT_TYPE = "groq"
except ImportError:
    try:
        from utils.simple_agents import simple_wildguard_agents as wildguard_agents
        AGENTS_AVAILABLE = True
        AGENT_TYPE = "simulated"
    except ImportError:
        AGENTS_AVAILABLE = False
        wildguard_agents = None
        AGENT_TYPE = "none"

def run_pipeline(wildlife_data, images, hotspots):
    """
    Run complete WildGuard AI analysis pipeline with agent integration.
    """
    
    # Step 1: Movement Analysis
    movement_alerts = movement.detect_anomalies(wildlife_data, hotspots)
    
    # Step 2: Vision Analysis (if images provided)
    vision_findings = []
    # TODO: Process images if provided
    
    # Step 3: Compute Risk Score
    risk_data = scoring.compute_score(
        movement_alerts=movement_alerts,
        vision_findings=vision_findings,
        hotspots=hotspots
    )
    
    # Step 4: Generate Report
    ranger_report = report.generate_briefing(
        movement_alerts,
        risk_data['risk_score']
    )
    
    # Step 5: Multi-Agent Analysis (if available)
    agent_analysis = None
    if AGENTS_AVAILABLE and wildguard_agents:
        try:
            agent_analysis = wildguard_agents.orchestrate_agents(
                wildlife_data=wildlife_data,
                hotspots=hotspots,
                movement_alerts=movement_alerts,
                vision_findings=vision_findings,
                risk_score=risk_data['risk_score']
            )
        except Exception as e:
            agent_analysis = {'error': f'Agent analysis failed: {str(e)}'}
    else:
        agent_analysis = {'status': 'unavailable', 'message': f'AI agents not available (mode: {AGENT_TYPE})'}
    
    return {
        'movement_alerts': movement_alerts,
        'vision_findings': vision_findings,
        'risk_assessment': risk_data,
        'ranger_report': ranger_report,
        'agent_analysis': agent_analysis,
        'pipeline_status': 'complete'
    }