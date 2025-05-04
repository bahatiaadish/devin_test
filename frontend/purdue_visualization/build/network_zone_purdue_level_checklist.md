# Network Zone and Purdue Level Classification Checklist

## Introduction
This checklist will help you determine which network zone and Purdue level an application, tool, or interface should belong to. By answering these questions, you can properly classify network traffic and ensure appropriate security boundaries.

## Part 1: Determining the Purdue Level

### Level 0 - Process (Field) Level
- [ ] Does the interface directly connect to or control physical equipment (sensors, actuators, valves, motors)?
- [ ] Is the interface part of a device that directly measures physical processes?
- [ ] Does the interface handle raw input/output signals from industrial equipment?
- [ ] Is the interface located on the factory floor or in direct contact with the manufacturing process?

### Level 1 - Basic Control Level
- [ ] Does the interface belong to a PLC, RTU, or other basic control device?
- [ ] Is the interface responsible for direct, real-time control of industrial processes?
- [ ] Does the interface run control logic that directly affects physical processes?
- [ ] Is the interface part of a system with millisecond-level response requirements?

### Level 2 - Area Control Level
- [ ] Does the interface belong to a supervisory control system (SCADA, HMI)?
- [ ] Does the interface monitor or manage multiple Level 1 devices?
- [ ] Is the interface used by operators to view or control industrial processes?
- [ ] Does the interface handle area-specific control functions or visualization?
- [ ] Is the interface part of a system that coordinates multiple basic controllers?

### Level 3 - Site Operations Level
- [ ] Does the interface belong to a site-wide management system?
- [ ] Is the interface used for production scheduling, maintenance management, or quality assurance?
- [ ] Does the interface handle historical data collection or reporting?
- [ ] Is the interface part of a manufacturing execution system (MES)?
- [ ] Does the interface manage workflows across multiple areas of a facility?
- [ ] Is the interface used primarily by supervisors or managers rather than operators?

### Level 3.5 - DMZ/Industrial DMZ
- [ ] Does the interface serve as a secure gateway between IT and OT networks?
- [ ] Is the interface part of a data diode, jump server, or secure transfer system?
- [ ] Does the interface handle data exchange between business and industrial systems?
- [ ] Is the interface designed specifically to enforce security boundaries?
- [ ] Does the interface provide controlled access between different security zones?

### Level 4 - Business Planning Level
- [ ] Does the interface belong to an enterprise resource planning (ERP) system?
- [ ] Is the interface used for business logistics, inventory management, or order processing?
- [ ] Does the interface handle business-level decision making?
- [ ] Is the interface primarily concerned with business operations rather than industrial processes?
- [ ] Does the interface connect to financial systems or customer data?

### Level 5 - Enterprise Level
- [ ] Does the interface connect to external networks or the internet?
- [ ] Is the interface part of a cloud service or external data sharing system?
- [ ] Does the interface handle enterprise-wide functions across multiple sites?
- [ ] Is the interface used for corporate-level decision making or reporting?
- [ ] Does the interface connect to third-party services or partners?

## Part 2: Determining the Network Zone

### Management Zone
- [ ] Is the interface used for administrative access to systems?
- [ ] Does the interface provide configuration, monitoring, or management capabilities?
- [ ] Is the interface used by IT or OT administrators rather than regular users?
- [ ] Does the interface require privileged access?
- [ ] Is the interface used for system health monitoring or maintenance?

### Enterprise Zone
- [ ] Is the interface part of a business system (ERP, CRM, etc.)?
- [ ] Does the interface handle business data rather than operational data?
- [ ] Is the interface used by office staff or business personnel?
- [ ] Does the interface connect to corporate networks?
- [ ] Is the interface involved in business processes rather than industrial processes?

### OT (Operational Technology) Zone
- [ ] Is the interface part of an industrial control system?
- [ ] Does the interface handle data related to physical processes?
- [ ] Is the interface used by plant operators or engineers?
- [ ] Does the interface require real-time or near-real-time operation?
- [ ] Is the interface critical to the operation of industrial equipment?

### Operations Zone
- [ ] Is the interface used for day-to-day operational activities?
- [ ] Does the interface handle workflow management or operational scheduling?
- [ ] Is the interface used by operational staff rather than management?
- [ ] Does the interface coordinate activities across multiple systems?
- [ ] Is the interface involved in executing operational plans?

### Security Zone
- [ ] Is the interface part of a security system (firewall, IDS/IPS, SIEM)?
- [ ] Does the interface handle security monitoring, logging, or incident response?
- [ ] Is the interface used by security personnel?
- [ ] Does the interface enforce security policies or access controls?
- [ ] Is the interface designed to protect other systems or data?

### App DMZ (Demilitarized Zone)
- [ ] Is the interface exposed to external networks or users?
- [ ] Does the interface serve as a buffer between internal and external systems?
- [ ] Is the interface part of a web application or public-facing service?
- [ ] Does the interface handle data exchange with external entities?
- [ ] Is the interface designed with extra security controls due to its exposure?

### Field Zone
- [ ] Is the interface located in or directly connected to the industrial environment?
- [ ] Does the interface handle raw sensor data or control signals?
- [ ] Is the interface part of field equipment or instrumentation?
- [ ] Does the interface operate in harsh environmental conditions?
- [ ] Is the interface physically located on the factory floor or in the process area?

## Part 3: Common Application Types and Their Typical Classifications

### Industrial Control Systems
- **HMI (Human-Machine Interface)**
  - Typical Purdue Level: 2
  - Common Zones: OT, Operations

- **PLC (Programmable Logic Controller)**
  - Typical Purdue Level: 1
  - Common Zones: OT, Field

- **DCS (Distributed Control System)**
  - Typical Purdue Level: 1-2
  - Common Zones: OT, Operations

- **SCADA (Supervisory Control and Data Acquisition)**
  - Typical Purdue Level: 2-3
  - Common Zones: OT, Operations, Management

### IT Systems
- **ERP (Enterprise Resource Planning)**
  - Typical Purdue Level: 4
  - Common Zones: Enterprise, Operations

- **MES (Manufacturing Execution System)**
  - Typical Purdue Level: 3
  - Common Zones: Operations, OT

- **Historian**
  - Typical Purdue Level: 3
  - Common Zones: OT, Operations

### Security Systems
- **Firewall Management Interface**
  - Typical Purdue Level: 3
  - Common Zones: Management, Security

- **SIEM (Security Information and Event Management)**
  - Typical Purdue Level: 3-4
  - Common Zones: Security, Management

- **Identity Management**
  - Typical Purdue Level: 3-4
  - Common Zones: Security, Management, Enterprise

### Network Infrastructure
- **Switch/Router Management**
  - Typical Purdue Level: 3
  - Common Zones: Management

- **Network Monitoring Tools**
  - Typical Purdue Level: 3
  - Common Zones: Management, Security

- **DNS/DHCP Services**
  - Typical Purdue Level: 3-3.5
  - Common Zones: Management, Enterprise

## Part 4: Decision Flow Chart

1. **Identify the primary function** of the application/interface
   - Control physical processes → Likely Level 0-2
   - Manage operations → Likely Level 3
   - Handle business functions → Likely Level 4-5

2. **Determine the criticality** to operations
   - Critical to safety or continuous operation → Likely OT or Field Zone
   - Important for coordination → Likely Operations Zone
   - Administrative or business function → Likely Enterprise or Management Zone

3. **Assess security requirements**
   - Handles sensitive data or enforces security → Security Zone
   - Interfaces between different security domains → App DMZ or Level 3.5
   - Requires strict access control → Management Zone

4. **Consider user roles**
   - Used by operators → OT Zone, Level 1-2
   - Used by engineers/technicians → Management Zone, Level 3
   - Used by business staff → Enterprise Zone, Level 4-5

## Conclusion

Use this checklist as a guide to help determine the appropriate Purdue level and network zone for your applications and interfaces. Remember that some applications may span multiple zones or levels, and in those cases, you should implement proper segmentation to ensure security between different components.

For complex systems, consider breaking them down into their component interfaces and evaluating each separately. This will help ensure proper network segmentation and security controls.
