#!/usr/bin/env python3
"""
Test script for WildGuard AI Groq agents integration
"""

import os
import sys
sys.path.append('.')

from utils.agents import wildguard_agents
from dotenv import load_dotenv

load_dotenv()

def test_groq_connection():
    """Test basic Groq API connection"""
    print("🧪 Testing Groq API connection...")
    
    if not os.getenv("GROQ_API_KEY"):
        print("❌ GROQ_API_KEY not found in environment")
        return False
    
    try:
        # Test with minimal data
        test_data = []
        test_hotspots = {'hotspots': []}
        test_alerts = []
        
        result = wildguard_agents.planner_agent(test_data, test_hotspots, test_alerts)
        print(f"✅ Groq connection successful!")
        print(f"📝 Sample response: {result[:100]}...")
        return True
        
    except Exception as e:
        print(f"❌ Groq connection failed: {str(e)}")
        return False

def test_all_agents():
    """Test all WildGuard agents"""
    print("\n🤖 Testing all WildGuard agents...")
    
    # Sample test data
    wildlife_data = [
        {"rhino_id": "RH001", "latitude": -25.7461, "longitude": 28.1881, "speed_kmh": 0.1}
    ]
    
    hotspots = {
        "hotspots": [
            {"id": "HS001", "name": "Northern Ridge", "latitude": -25.7460, "longitude": 28.1880}
        ]
    }
    
    movement_alerts = [
        {"rhino_id": "RH001", "reason": ["sudden_speed_drop"], "confidence": 0.85}
    ]
    
    vision_findings = [
        {"label": "tire_tracks", "confidence": 0.87, "severity": 0.75}
    ]
    
    risk_score = 65
    
    try:
        # Test orchestration
        results = wildguard_agents.orchestrate_agents(
            wildlife_data=wildlife_data,
            hotspots=hotspots,
            movement_alerts=movement_alerts,
            vision_findings=vision_findings,
            risk_score=risk_score
        )
        
        print("✅ Multi-agent orchestration successful!")
        print(f"📊 Agents used: {results['agents_used']}")
        print(f"📝 Final report length: {len(results['final_report'])} characters")
        
        return True
        
    except Exception as e:
        print(f"❌ Agent orchestration failed: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("🚀 WildGuard AI - Groq Integration Test")
    print("=" * 50)
    
    # Test 1: Basic connection
    connection_ok = test_groq_connection()
    
    if connection_ok:
        # Test 2: All agents
        agents_ok = test_all_agents()
        
        if agents_ok:
            print("\n🎉 All tests passed! Groq integration is working.")
        else:
            print("\n⚠️  Connection works but agent orchestration failed.")
    else:
        print("\n❌ Cannot proceed - fix Groq API connection first.")
        print("💡 Make sure GROQ_API_KEY is set in your .env file")

if __name__ == "__main__":
    main()