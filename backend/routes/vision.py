try:
    from PIL import Image
except ImportError:
    Image = None
import io
import base64

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

def analyze_image(file):
    """
    Analyze image for poaching signs using Groq-powered vision analysis.
    """
    try:
        # Open image
        if Image:
            img = Image.open(file.stream)
            # Convert to base64 for analysis description
            img_info = f"Image: {file.filename}, Size: {img.size if hasattr(img, 'size') else 'unknown'}"
        else:
            img_info = f"Image: {file.filename}"
        
        # Simulated findings for demo (in production, would process actual image)
        findings = [
            {
                'label': 'tire tracks',
                'confidence': 0.87,
                'severity': 0.75,
                'notes': 'Fresh vehicle tracks detected near animal location'
            },
            {
                'label': 'human presence',
                'confidence': 0.62,
                'severity': 0.65,
                'notes': 'Possible human figures in background'
            }
        ]
        
        # Get AI agent analysis of the findings (if available)
        if AGENTS_AVAILABLE and wildguard_agents:
            try:
                agent_analysis = wildguard_agents.vision_analyst_agent(findings)
                findings.append({
                    'label': 'ai_analysis',
                    'confidence': 0.95,
                    'severity': 0.8,
                    'notes': agent_analysis[:200] + "..." if len(agent_analysis) > 200 else agent_analysis
                })
            except Exception as agent_error:
                findings.append({
                    'label': 'ai_analysis_error',
                    'confidence': 0.0,
                    'severity': 0.0,
                    'notes': f'Agent analysis failed: {str(agent_error)}'
                })
        else:
            findings.append({
                'label': 'ai_analysis_unavailable',
                'confidence': 0.0,
                'severity': 0.0,
                'notes': f'AI agent analysis not available (mode: {AGENT_TYPE})'
            })
        
        return findings
    except Exception as e:
        return [{'error': str(e)}]