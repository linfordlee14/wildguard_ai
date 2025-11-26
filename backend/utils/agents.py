import os
from dotenv import load_dotenv
import json
from datetime import datetime

load_dotenv()

# Initialize Groq client using OpenAI-compatible interface
try:
    import openai
    
    # Handle different OpenAI client versions
    groq_api_key = os.getenv("GROQ_API_KEY")
    if groq_api_key:
        try:
            # Try new OpenAI client initialization
            client = openai.OpenAI(
                base_url="https://api.groq.com/openai/v1",
                api_key=groq_api_key
            )
        except Exception as e:
            # Fallback for older versions or compatibility issues
            print(f"OpenAI client initialization failed: {e}")
            client = None
    else:
        client = None
        print("GROQ_API_KEY not found in environment")
        
except ImportError:
    print("OpenAI package not installed")
    client = None
    openai = None

class WildGuardAgents:
    """Multi-agent system for wildlife conservation using Groq API"""
    
    def __init__(self):
        self.model = "llama3-8b-8192"  # Groq's fast model
        
    def planner_agent(self, wildlife_data, hotspots, alerts):
        """Strategic planning agent for ranger deployment"""
        if not client:
            return "Groq client not available. Check GROQ_API_KEY and OpenAI installation."
            
        prompt = f"""
You are a wildlife conservation strategic planner. Analyze the data and create an optimal ranger deployment plan.

WILDLIFE DATA: {len(wildlife_data)} tracked animals
HOTSPOTS: {len(hotspots.get('hotspots', []))} known risk areas  
CURRENT ALERTS: {len(alerts)} active alerts

Create a tactical deployment plan including:
1. Priority zones for immediate patrol
2. Resource allocation recommendations
3. Risk mitigation strategies
4. Timeline for actions

Be concise and actionable.
"""
        
        try:
            response = client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are an expert wildlife conservation strategist."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.3
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Planner agent error: {str(e)}"
    
    def movement_analyst_agent(self, movement_alerts):
        """Specialized agent for movement pattern analysis"""
        prompt = f"""
Analyze these wildlife movement alerts for patterns and threats:

ALERTS: {json.dumps(movement_alerts[:3], indent=2)}

Identify:
1. Movement anomaly patterns
2. Potential threat indicators  
3. Behavioral changes suggesting stress
4. Recommended monitoring adjustments

Provide expert wildlife behavior analysis.
"""
        
        try:
            response = client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a wildlife behavior expert specializing in anti-poaching detection."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=400,
                temperature=0.2
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Movement analyst error: {str(e)}"
    
    def vision_analyst_agent(self, image_findings):
        """Agent for analyzing visual evidence and camera trap data"""
        prompt = f"""
Analyze these visual findings from camera traps and surveillance:

FINDINGS: {json.dumps(image_findings, indent=2)}

Assess:
1. Threat level of detected objects/activities
2. Evidence quality and reliability
3. Recommended follow-up actions
4. Correlation with known poaching methods

Provide forensic-level analysis for conservation officers.
"""
        
        try:
            response = client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a forensic analyst specializing in wildlife crime detection."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=400,
                temperature=0.2
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Vision analyst error: {str(e)}"
    
    def risk_scoring_agent(self, movement_alerts, vision_findings, risk_score):
        """Agent for intelligent risk assessment and scoring"""
        prompt = f"""
Evaluate the current conservation threat level:

MOVEMENT ALERTS: {len(movement_alerts)} detected
VISION FINDINGS: {len(vision_findings)} items
COMPUTED RISK SCORE: {risk_score}/100

Provide:
1. Risk assessment validation
2. Missing factors to consider
3. Confidence level in current score
4. Recommendations for score adjustment

Focus on accuracy and false positive reduction.
"""
        
        try:
            response = client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a risk assessment specialist for wildlife conservation."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=300,
                temperature=0.1
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Risk scoring agent error: {str(e)}"
    
    def report_generator_agent(self, alerts, risk_score, analysis_results):
        """Agent for generating comprehensive ranger briefings"""
        prompt = f"""
Generate a professional ranger briefing report:

ALERTS: {len(alerts)} total
RISK SCORE: {risk_score}/100
ANALYSIS: {analysis_results.get('summary', 'Standard analysis completed')}

Create a briefing that includes:
1. Executive summary
2. Immediate action items
3. Resource deployment recommendations
4. Follow-up monitoring plan

Format for field rangers - clear, actionable, professional.
"""
        
        try:
            response = client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a conservation operations coordinator writing for field rangers."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=600,
                temperature=0.2
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Report generator error: {str(e)}"
    
    def orchestrate_agents(self, wildlife_data, hotspots, movement_alerts, vision_findings, risk_score):
        """Coordinate all agents for comprehensive analysis"""
        
        print("🤖 Starting multi-agent analysis...")
        
        # Agent 1: Strategic Planning
        planning_analysis = self.planner_agent(wildlife_data, hotspots, movement_alerts)
        
        # Agent 2: Movement Analysis  
        movement_analysis = self.movement_analyst_agent(movement_alerts)
        
        # Agent 3: Vision Analysis
        vision_analysis = self.vision_analyst_agent(vision_findings)
        
        # Agent 4: Risk Assessment
        risk_analysis = self.risk_scoring_agent(movement_alerts, vision_findings, risk_score)
        
        # Compile results
        analysis_results = {
            'planning': planning_analysis,
            'movement': movement_analysis, 
            'vision': vision_analysis,
            'risk_assessment': risk_analysis,
            'summary': f"Multi-agent analysis completed with {len(movement_alerts)} alerts processed"
        }
        
        # Agent 5: Final Report Generation
        final_report = self.report_generator_agent(movement_alerts, risk_score, analysis_results)
        
        return {
            'agent_analyses': analysis_results,
            'final_report': final_report,
            'timestamp': datetime.utcnow().isoformat(),
            'agents_used': ['planner', 'movement_analyst', 'vision_analyst', 'risk_scorer', 'report_generator']
        }

# Global instance
wildguard_agents = WildGuardAgents()