from flask import jsonify, request
from datetime import datetime

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

def analyze_with_agents():
    """Run multi-agent analysis pipeline"""
    if not AGENTS_AVAILABLE:
        return jsonify({
            'status': 'unavailable',
            'message': f'AI agents not available (mode: {AGENT_TYPE})',
            'timestamp': datetime.utcnow().isoformat()
        }), 503
    
    try:
        data = request.get_json()
        
        wildlife_data = data.get('wildlife_data', [])
        hotspots = data.get('hotspots', {'hotspots': []})
        movement_alerts = data.get('movement_alerts', [])
        vision_findings = data.get('vision_findings', [])
        risk_score = data.get('risk_score', 0)
        
        # Run multi-agent orchestration
        agent_results = wildguard_agents.orchestrate_agents(
            wildlife_data=wildlife_data,
            hotspots=hotspots,
            movement_alerts=movement_alerts,
            vision_findings=vision_findings,
            risk_score=risk_score
        )
        
        return jsonify({
            'status': 'success',
            'agent_results': agent_results,
            'agent_type': AGENT_TYPE,
            'timestamp': datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'error': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 400

def get_agent_status():
    """Check agent system status"""
    if not AGENTS_AVAILABLE:
        return jsonify({
            'status': 'unavailable',
            'message': f'AI agents not available (mode: {AGENT_TYPE})',
            'setup_instructions': [
                'pip install openai',
                'Add GROQ_API_KEY=gsk_your-key-here to .env file',
                'Restart the backend server'
            ],
            'timestamp': datetime.utcnow().isoformat()
        }), 503
    
    try:
        # Test Groq connection
        test_response = wildguard_agents.planner_agent([], {'hotspots': []}, [])
        
        return jsonify({
            'status': 'operational',
            'agent_type': AGENT_TYPE,
            'model': wildguard_agents.model,
            'agents': ['planner', 'movement_analyst', 'vision_analyst', 'risk_scorer', 'report_generator'],
            'test_response_length': len(test_response),
            'timestamp': datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'error': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 500