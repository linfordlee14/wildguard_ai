from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
from datetime import datetime

# Import route modules
from routes import movement, vision, scoring, report, orchestrate, agents

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file upload

# Load data
with open('../data/wildguard_simulated_tracks.json', 'r') as f:
    WILDLIFE_DATA = json.load(f)

with open('../data/hotspots.json', 'r') as f:
    HOTSPOTS = json.load(f)

# ==================== HEALTH CHECK ====================
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'WildGuard AI Backend Running',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    }), 200

# ==================== DATA ENDPOINTS ====================
@app.route('/api/data', methods=['GET'])
def get_data():
    """Return all wildlife tracking data"""
    return jsonify(WILDLIFE_DATA), 200

@app.route('/api/hotspots', methods=['GET'])
def get_hotspots():
    """Return all poaching hotspots"""
    return jsonify(HOTSPOTS), 200

# ==================== ANALYSIS ENDPOINTS ====================
@app.route('/api/movement', methods=['POST'])
def analyze_movement():
    """Analyze movement anomalies"""
    try:
        data = request.get_json()
        wildlife_data = data.get('data', WILDLIFE_DATA)
        
        alerts = movement.detect_anomalies(wildlife_data, HOTSPOTS)
        
        return jsonify({
            'movement_alerts': alerts,
            'timestamp': datetime.utcnow().isoformat(),
            'total_alerts': len(alerts)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/vision', methods=['POST'])
def analyze_vision():
    """Analyze uploaded images for poaching signs"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        findings = vision.analyze_image(file)
        
        return jsonify({
            'vision_results': [{
                'file': file.filename,
                'findings': findings
            }],
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/score', methods=['POST'])
def compute_risk_score():
    """Compute overall risk score"""
    try:
        data = request.get_json()
        alerts = data.get('alerts', [])
        vision_findings = data.get('vision_findings', [])
        
        risk_data = scoring.compute_score(
            movement_alerts=alerts,
            vision_findings=vision_findings,
            hotspots=HOTSPOTS
        )
        
        return jsonify(risk_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/report', methods=['POST'])
def generate_report():
    """Generate daily ranger briefing"""
    try:
        data = request.get_json()
        alerts = data.get('alerts', [])
        risk_score = data.get('riskScore', 0)
        
        report_text = report.generate_briefing(alerts, risk_score)
        
        return jsonify({
            'ranger_report': report_text,
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# ==================== ORCHESTRATION ====================
@app.route('/api/orchestrate', methods=['POST'])
def run_full_pipeline():
    """Run complete analysis pipeline"""
    try:
        data = request.get_json()
        
        results = orchestrate.run_pipeline(
            wildlife_data=data.get('data', WILDLIFE_DATA),
            images=data.get('images', []),
            hotspots=HOTSPOTS
        )
        
        return jsonify(results), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# ==================== AGENT ENDPOINTS ====================
@app.route('/api/agents/analyze', methods=['POST'])
def analyze_with_agents():
    """Run multi-agent analysis"""
    return agents.analyze_with_agents()

@app.route('/api/agents/status', methods=['GET'])
def get_agent_status():
    """Check agent system status"""
    return agents.get_agent_status()

# ==================== ERROR HANDLERS ====================
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=os.getenv('FLASK_ENV') == 'development', port=port)
