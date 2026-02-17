// Tools Page JavaScript
// Telecom Security Library Tools and Calculators

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Tools page loaded successfully!');
    
    // Initialize range slider displays
    initializeRangeSliders();
    
    // Initialize port range selector
    initializePortRangeSelector();
    
    // Add animation classes to elements
    addAnimations();
    
    // Track page load
    trackPageLoad();
});

// Initialize range slider value displays
function initializeRangeSliders() {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    
    rangeInputs.forEach(input => {
        const display = input.nextElementSibling;
        if (display && display.classList.contains('value-display')) {
            display.textContent = input.value;
            
            input.addEventListener('input', function() {
                display.textContent = this.value;
            });
        }
    });
}

// Initialize port range selector
function initializePortRangeSelector() {
    const portRange = document.getElementById('port-range');
    const customPorts = document.getElementById('custom-ports');
    
    if (portRange && customPorts) {
        portRange.addEventListener('change', function() {
            if (this.value === 'custom') {
                customPorts.classList.remove('d-none');
            } else {
                customPorts.classList.add('d-none');
            }
        });
    }
}

// Add animations to elements
function addAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe tool cards
    document.querySelectorAll('.tool-card').forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 100);
    });
    
    // Observe resource cards
    document.querySelectorAll('.resource-card').forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 100);
    });
}

// Track page load for analytics
function trackPageLoad() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'Telecom Security Tools',
            page_location: window.location.href
        });
    }
}

// Risk Assessment Calculator
function calculateRisk() {
    const threatLevel = parseInt(document.getElementById('threat-level').value);
    const vulnerabilityScore = parseInt(document.getElementById('vulnerability-score').value);
    const impactLevel = parseInt(document.getElementById('impact-level').value);
    
    // Calculate risk score (Threat × Vulnerability × Impact)
    const riskScore = threatLevel * vulnerabilityScore * impactLevel;
    
    // Determine risk level
    let riskLevel, riskClass, riskDescription;
    
    if (riskScore <= 100) {
        riskLevel = 'Low Risk';
        riskClass = 'low-risk';
        riskDescription = 'Acceptable risk level with minimal security concerns.';
    } else if (riskScore <= 300) {
        riskLevel = 'Medium Risk';
        riskClass = 'medium-risk';
        riskDescription = 'Moderate risk level requiring attention and monitoring.';
    } else {
        riskLevel = 'High Risk';
        riskClass = 'high-risk';
        riskDescription = 'Critical risk level requiring immediate action and mitigation.';
    }
    
    // Display result
    const resultDiv = document.getElementById('risk-result');
    resultDiv.innerHTML = `
        <h5 class="mb-2">Risk Assessment Result</h5>
        <p><strong>Risk Score:</strong> ${riskScore}/1000</p>
        <p><strong>Risk Level:</strong> ${riskLevel}</p>
        <p><strong>Description:</strong> ${riskDescription}</p>
        <hr>
        <p><strong>Breakdown:</strong></p>
        <ul class="mb-0">
            <li>Threat Level: ${threatLevel}/10</li>
            <li>Vulnerability Score: ${vulnerabilityScore}/10</li>
            <li>Impact Level: ${impactLevel}/10</li>
        </ul>
    `;
    
    resultDiv.className = `mt-3 p-3 rounded ${riskClass}`;
    resultDiv.classList.remove('d-none');
    
    // Track calculator usage
    trackCalculatorUsage('risk_assessment', riskScore);
}

// Network Coverage Calculator
function calculateCoverage() {
    const frequency = parseFloat(document.getElementById('frequency').value);
    const power = parseFloat(document.getElementById('power').value);
    const distance = parseFloat(document.getElementById('distance').value);
    
    // Calculate path loss using simplified free space path loss model
    const pathLoss = 20 * Math.log10(frequency) + 20 * Math.log10(distance) + 32.44;
    
    // Calculate received signal strength
    const receivedPower = power - pathLoss;
    
    // Determine signal quality
    let signalQuality, qualityClass;
    if (receivedPower >= -70) {
        signalQuality = 'Excellent';
        qualityClass = 'text-success';
    } else if (receivedPower >= -85) {
        signalQuality = 'Good';
        qualityClass = 'text-primary';
    } else if (receivedPower >= -100) {
        signalQuality = 'Fair';
        qualityClass = 'text-warning';
    } else {
        signalQuality = 'Poor';
        qualityClass = 'text-danger';
    }
    
    // Display result
    const resultDiv = document.getElementById('coverage-result');
    resultDiv.innerHTML = `
        <h5 class="mb-2">Coverage Analysis Result</h5>
        <p><strong>Path Loss:</strong> ${pathLoss.toFixed(2)} dB</p>
        <p><strong>Received Power:</strong> ${receivedPower.toFixed(2)} dBm</p>
        <p><strong>Signal Quality:</strong> <span class="${qualityClass}">${signalQuality}</span></p>
        <hr>
        <p><strong>Parameters:</strong></p>
        <ul class="mb-0">
            <li>Frequency: ${frequency} MHz</li>
            <li>Transmit Power: ${power} dBm</li>
            <li>Distance: ${distance} km</li>
        </ul>
    `;
    
    resultDiv.classList.remove('d-none');
    
    // Track calculator usage
    trackCalculatorUsage('coverage_calculator', receivedPower);
}

// Encryption Strength Calculator
function calculateEncryption() {
    const keyLength = parseInt(document.getElementById('key-length').value);
    const algorithm = document.getElementById('algorithm').value;
    
    // Calculate theoretical cracking time (simplified)
    let crackingTime, securityLevel;
    
    if (keyLength <= 128) {
        crackingTime = 'Seconds to hours';
        securityLevel = 'Low';
    } else if (keyLength <= 256) {
        crackingTime = 'Years to decades';
        securityLevel = 'Medium';
    } else if (keyLength <= 512) {
        crackingTime = 'Centuries';
        securityLevel = 'High';
    } else {
        crackingTime = 'Millennia';
        securityLevel = 'Very High';
    }
    
    // Algorithm-specific adjustments
    let algorithmNote = '';
    if (algorithm === 'ECC' && keyLength >= 256) {
        algorithmNote = 'ECC provides equivalent security with shorter keys.';
    } else if (algorithm === 'RSA' && keyLength >= 2048) {
        algorithmNote = 'RSA 2048+ is considered secure for most applications.';
    }
    
    // Display result
    const resultDiv = document.getElementById('encryption-result');
    resultDiv.innerHTML = `
        <h5 class="mb-2">Encryption Strength Analysis</h5>
        <p><strong>Algorithm:</strong> ${algorithm}</p>
        <p><strong>Key Length:</strong> ${keyLength} bits</p>
        <p><strong>Security Level:</strong> ${securityLevel}</p>
        <p><strong>Theoretical Cracking Time:</strong> ${crackingTime}</p>
        ${algorithmNote ? `<p><strong>Note:</strong> ${algorithmNote}</p>` : ''}
        <hr>
        <p><strong>Recommendations:</strong></p>
        <ul class="mb-0">
            <li>Use ${algorithm} with ${keyLength >= 256 ? 'current' : 'longer'} key lengths</li>
            <li>Implement proper key management practices</li>
            <li>Regular key rotation and updates</li>
            <li>Monitor for algorithm vulnerabilities</li>
        </ul>
    `;
    
    resultDiv.classList.remove('d-none');
    
    // Track calculator usage
    trackCalculatorUsage('encryption_calculator', keyLength);
}

// Compliance Checker
function checkCompliance() {
    const standard = document.getElementById('standard').value;
    const level = document.getElementById('compliance-level').value;
    
    // Generate compliance report
    const complianceData = {
        '3GPP': {
            basic: ['Network Authentication', 'User Privacy', 'Basic Encryption'],
            intermediate: ['Advanced Authentication', 'Privacy Protection', 'Encryption Standards', 'Access Control'],
            advanced: ['Comprehensive Security', 'Privacy Framework', 'Advanced Encryption', 'Access Management', 'Audit Logging']
        },
        'GSMA': {
            basic: ['Security Guidelines', 'Basic Authentication', 'Privacy Standards'],
            intermediate: ['Security Framework', 'Advanced Authentication', 'Privacy Protection', 'Encryption'],
            advanced: ['Comprehensive Security', 'Advanced Privacy', 'Full Encryption', 'Access Control', 'Monitoring']
        },
        'NIST': {
            basic: ['Identify', 'Protect'],
            intermediate: ['Identify', 'Protect', 'Detect'],
            advanced: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover']
        },
        'ISO27001': {
            basic: ['Information Security Policy', 'Asset Management', 'Access Control'],
            intermediate: ['Security Policy', 'Asset Management', 'Access Control', 'Cryptography', 'Physical Security'],
            advanced: ['Full ISMS Implementation', 'Risk Management', 'Security Controls', 'Monitoring', 'Continuous Improvement']
        },
        'PCI-DSS': {
            basic: ['Build Secure Network', 'Protect Cardholder Data'],
            intermediate: ['Secure Network', 'Cardholder Data', 'Vulnerability Management', 'Access Control'],
            advanced: ['Full PCI Compliance', 'Security Monitoring', 'Incident Response', 'Regular Testing', 'Security Policy']
        }
    };
    
    const requirements = complianceData[standard][level];
    
    // Display result
    const resultDiv = document.getElementById('compliance-result');
    resultDiv.innerHTML = `
        <h5 class="mb-2">Compliance Report</h5>
        <p><strong>Standard:</strong> ${standard}</p>
        <p><strong>Compliance Level:</strong> ${level.charAt(0).toUpperCase() + level.slice(1)}</p>
        <hr>
        <p><strong>Required Controls:</strong></p>
        <ul class="mb-0">
            ${requirements.map(req => `<li>${req}</li>`).join('')}
        </ul>
        <hr>
        <p><strong>Next Steps:</strong></p>
        <ul class="mb-0">
            <li>Review current implementation against requirements</li>
            <li>Identify gaps and prioritize remediation</li>
            <li>Implement missing controls</li>
            <li>Conduct regular compliance assessments</li>
        </ul>
    `;
    
    resultDiv.classList.remove('d-none');
    
    // Track calculator usage
    trackCalculatorUsage('compliance_checker', requirements.length);
}

// Port Scanner (Simulated)
function scanPorts() {
    const targetIP = document.getElementById('target-ip').value;
    const portRange = document.getElementById('port-range').value;
    
    if (!targetIP) {
        alert('Please enter a target IP address');
        return;
    }
    
    // Simulate port scanning
    const button = event.target;
    button.classList.add('loading');
    button.disabled = true;
    
    setTimeout(() => {
        // Generate simulated results
        const commonPorts = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995];
        const openPorts = commonPorts.filter(() => Math.random() > 0.7);
        
        const resultDiv = document.getElementById('scan-result');
        resultDiv.innerHTML = `
            <h5 class="mb-2">Port Scan Results</h5>
            <p><strong>Target:</strong> ${targetIP}</p>
            <p><strong>Port Range:</strong> ${portRange}</p>
            <p><strong>Open Ports:</strong> ${openPorts.length}</p>
            <hr>
            <p><strong>Port Details:</strong></p>
            <ul class="mb-0">
                ${openPorts.map(port => {
                    const services = {
                        21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP', 53: 'DNS',
                        80: 'HTTP', 110: 'POP3', 143: 'IMAP', 443: 'HTTPS', 993: 'IMAPS', 995: 'POP3S'
                    };
                    return `<li>Port ${port}: ${services[port] || 'Unknown Service'}</li>`;
                }).join('')}
            </ul>
            <hr>
            <p><strong>Security Recommendations:</strong></p>
            <ul class="mb-0">
                <li>Close unnecessary open ports</li>
                <li>Use firewall rules to restrict access</li>
                <li>Implement intrusion detection</li>
                <li>Regular security audits</li>
            </ul>
        `;
        
        resultDiv.classList.remove('d-none');
        
        // Reset button
        button.classList.remove('loading');
        button.disabled = false;
        
        // Track tool usage
        trackCalculatorUsage('port_scanner', openPorts.length);
    }, 2000);
}

// Protocol Analyzer
function analyzeProtocol() {
    const protocol = document.getElementById('protocol').value;
    const message = document.getElementById('message').value;
    
    if (!message.trim()) {
        alert('Please enter a protocol message to analyze');
        return;
    }
    
    // Simulate protocol analysis
    const button = event.target;
    button.classList.add('loading');
    button.disabled = true;
    
    setTimeout(() => {
        // Generate analysis results
        const vulnerabilities = [
            'Potential injection vulnerability detected',
            'Missing authentication headers',
            'Weak encryption parameters',
            'Protocol version mismatch',
            'Invalid message format'
        ].filter(() => Math.random() > 0.5);
        
        const resultDiv = document.getElementById('protocol-result');
        resultDiv.innerHTML = `
            <h5 class="mb-2">Protocol Analysis Results</h5>
            <p><strong>Protocol:</strong> ${protocol}</p>
            <p><strong>Message Length:</strong> ${message.length} characters</p>
            <p><strong>Vulnerabilities Found:</strong> ${vulnerabilities.length}</p>
            <hr>
            ${vulnerabilities.length > 0 ? `
                <p><strong>Security Issues:</strong></p>
                <ul class="mb-2">
                    ${vulnerabilities.map(vuln => `<li>${vuln}</li>`).join('')}
                </ul>
            ` : '<p><strong>No obvious vulnerabilities detected</strong></p>'}
            <hr>
            <p><strong>Recommendations:</strong></p>
            <ul class="mb-0">
                <li>Implement proper input validation</li>
                <li>Use strong authentication mechanisms</li>
                <li>Enable encryption for sensitive data</li>
                <li>Regular security testing</li>
            </ul>
        `;
        
        resultDiv.classList.remove('d-none');
        
        // Reset button
        button.classList.remove('loading');
        button.disabled = false;
        
        // Track tool usage
        trackCalculatorUsage('protocol_analyzer', vulnerabilities.length);
    }, 1500);
}

// Signal Strength Calculator
function calculateSignal() {
    const txPower = parseFloat(document.getElementById('tx-power').value);
    const antennaGain = parseFloat(document.getElementById('antenna-gain').value);
    const pathLoss = parseFloat(document.getElementById('path-loss').value);
    
    // Calculate received signal strength
    const receivedPower = txPower + antennaGain - pathLoss;
    
    // Determine signal quality
    let signalQuality, qualityClass;
    if (receivedPower >= -50) {
        signalQuality = 'Excellent';
        qualityClass = 'text-success';
    } else if (receivedPower >= -70) {
        signalQuality = 'Good';
        qualityClass = 'text-primary';
    } else if (receivedPower >= -90) {
        signalQuality = 'Fair';
        qualityClass = 'text-warning';
    } else {
        signalQuality = 'Poor';
        qualityClass = 'text-danger';
    }
    
    // Display result
    const resultDiv = document.getElementById('signal-result');
    resultDiv.innerHTML = `
        <h5 class="mb-2">Signal Strength Analysis</h5>
        <p><strong>Received Power:</strong> ${receivedPower.toFixed(2)} dBm</p>
        <p><strong>Signal Quality:</strong> <span class="${qualityClass}">${signalQuality}</span></p>
        <hr>
        <p><strong>Parameters:</strong></p>
        <ul class="mb-0">
            <li>Transmit Power: ${txPower} dBm</li>
            <li>Antenna Gain: ${antennaGain} dBi</li>
            <li>Path Loss: ${pathLoss} dB</li>
        </ul>
        <hr>
        <p><strong>Recommendations:</strong></p>
        <ul class="mb-0">
            <li>Optimize antenna positioning</li>
            <li>Reduce obstacles in signal path</li>
            <li>Consider signal amplifiers if needed</li>
            <li>Monitor signal quality regularly</li>
        </ul>
    `;
    
    resultDiv.classList.remove('d-none');
    
    // Track calculator usage
    trackCalculatorUsage('signal_calculator', receivedPower);
}

// Security Metrics Dashboard
function generateReport() {
    const reportType = document.getElementById('report-type').value;
    const timeframe = document.getElementById('timeframe').value;
    
    // Generate simulated report
    const button = event.target;
    button.classList.add('loading');
    button.disabled = true;
    
    setTimeout(() => {
        // Generate report content based on type
        let reportContent = '';
        let metrics = [];
        
        switch (reportType) {
            case 'security':
                metrics = [
                    'Security Score: 85/100',
                    'Vulnerabilities: 12 (3 Critical)',
                    'Patches Applied: 45',
                    'Incidents: 2 (Resolved)',
                    'Compliance: 92%'
                ];
                reportContent = 'Comprehensive security assessment covering network, application, and physical security aspects.';
                break;
            case 'compliance':
                metrics = [
                    '3GPP Compliance: 89%',
                    'GSMA Standards: 94%',
                    'NIST Framework: 87%',
                    'ISO 27001: 91%',
                    'Overall Score: 90%'
                ];
                reportContent = 'Detailed compliance analysis against industry standards and regulatory requirements.';
                break;
            case 'risk':
                metrics = [
                    'High Risk Items: 3',
                    'Medium Risk Items: 8',
                    'Low Risk Items: 15',
                    'Risk Score: 72/100',
                    'Trend: Decreasing'
                ];
                reportContent = 'Risk assessment and analysis with mitigation strategies and progress tracking.';
                break;
            case 'performance':
                metrics = [
                    'Uptime: 99.97%',
                    'Response Time: 45ms',
                    'Throughput: 2.1 Gbps',
                    'Error Rate: 0.03%',
                    'Capacity: 87%'
                ];
                reportContent = 'Performance metrics and system health indicators for telecom infrastructure.';
                break;
        }
        
        const resultDiv = document.getElementById('report-result');
        resultDiv.innerHTML = `
            <h5 class="mb-2">${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h5>
            <p><strong>Timeframe:</strong> ${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <p><strong>Summary:</strong> ${reportContent}</p>
            <hr>
            <p><strong>Key Metrics:</strong></p>
            <ul class="mb-0">
                ${metrics.map(metric => `<li>${metric}</li>`).join('')}
            </ul>
            <hr>
            <p><strong>Actions Required:</strong></p>
            <ul class="mb-0">
                <li>Review and address critical vulnerabilities</li>
                <li>Update security policies and procedures</li>
                <li>Conduct team training and awareness</li>
                <li>Schedule follow-up assessment</li>
            </ul>
        `;
        
        resultDiv.classList.remove('d-none');
        
        // Reset button
        button.classList.remove('loading');
        button.disabled = false;
        
        // Track tool usage
        trackCalculatorUsage('metrics_dashboard', metrics.length);
    }, 2000);
}

// Track calculator and tool usage for analytics
function trackCalculatorUsage(toolName, result) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tool_usage', {
            tool_name: toolName,
            result_value: result,
            page_title: 'Telecom Security Tools'
        });
    }
    
    // Log to console for development
    console.log(`🔧 Tool used: ${toolName}, Result: ${result}`);
}

// Export functions for global access
window.calculateRisk = calculateRisk;
window.calculateCoverage = calculateCoverage;
window.calculateEncryption = calculateEncryption;
window.checkCompliance = checkCompliance;
window.scanPorts = scanPorts;
window.analyzeProtocol = analyzeProtocol;
window.calculateSignal = calculateSignal;
window.generateReport = generateReport;
