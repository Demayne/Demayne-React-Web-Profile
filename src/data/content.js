// Single source of truth for everything the site says. Edit here, not in components.

export const profile = {
  name: 'Demayne Govender',
  firstName: 'Demayne',
  lastName: 'Govender',
  role: 'Full-Stack Software Engineer',
  headline: 'Full-Stack Software Engineer · Cloud & Business Process Automation',
  disciplines: ['Full-stack', 'Cloud', 'Process Automation'],
  tagline: 'From the schema to the last pixel.',
  location: 'Johannesburg, South Africa',
  timezone: 'Africa/Johannesburg',
  email: 'govender.demayne@gmail.com',
  resume: '/Demayne_Govender_Resume_2026.pdf',
  available: true,
  socials: [
    { label: 'GitHub', href: 'https://github.com/Demayne' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/demaynegovender' },
  ],
}

export const sections = [
  { id: 'about', label: 'About', path: '/about' },
  { id: 'work', label: 'Work', path: '/projects' },
  { id: 'experience', label: 'Experience', path: '/experience' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]

export const intro =
  'Full-stack software engineer delivering production web applications, low-code BPM workflows and business process automation, with Azure-certified, hands-on AWS cloud skills. Top 10 in class with a 99% programme average.'

// Words that drift into the About scroll zone. Positions are % of the stage:
// d = landscape / desktop, m = portrait / mobile.
export const constellation = [
  { text: 'Precision', kind: 'serif', d: [20, 28], m: [30, 17] },
  { text: 'React', kind: 'tech', d: [42, 14], m: [78, 13] },
  { text: 'Least-privilege IAM', kind: 'sans', d: [74, 22], m: [60, 27] },
  { text: 'Node.js', kind: 'tech', d: [88, 42], m: [18, 35] },
  { text: 'BPM workflow design', kind: 'sans', d: [17, 52], m: [46, 41] },
  { text: 'Process', kind: 'serif', d: [62, 47], m: [70, 51] },
  { text: 'AWS', kind: 'tech', d: [35, 39], m: [84, 63] },
  { text: 'Payroll: 4 hrs → 5 min', kind: 'sans', d: [30, 73], m: [40, 60] },
  { text: 'Aurachain', kind: 'tech', d: [11, 87], m: [18, 72] },
  { text: 'Automation', kind: 'serif', d: [74, 72], m: [36, 81] },
  { text: '99.7% RPA uptime', kind: 'sans', d: [53, 89], m: [62, 91] },
  { text: 'Azure', kind: 'tech', d: [90, 89], m: [84, 76] },
]

export const statement = ['I build software that', 'removes friction.']

export const bio = [
  'I work across the stack with React, Node.js and Python, and I design business processes as carefully as code. On Aurachain I model approval workflows end to end: role-based routing, escalation gateways, validation rules and audit trails that hold up in front of a client.',
  'That process thinking comes from industry. I automated payroll and RPA infrastructure, cutting processing time by 85% and lifting uptime to 99.7%, then spent a year mapping logistics and invoicing workflows into automation requirements. I back it with Azure certification and hands-on AWS networking and IAM work.',
]

export const stats = [
  { value: 20, suffix: '+', label: 'engineering hours reclaimed weekly' },
  { value: 99, suffix: '%', label: 'engineering programme average' },
  { value: 85, suffix: '%', label: 'payroll processing time cut' },
  { value: 99.7, suffix: '%', decimals: 1, label: 'rpa uptime achieved' },
]

export const stack = {
  'Business Process & Low-code': [
    'Aurachain (Process Design, Advanced Logic Scripting, Data Store Modelling)',
    'BPM Workflow Design',
    'Approval Routing & Escalation Gateways',
    'Business Process Mapping',
    'Requirements Analysis',
  ],
  'Automation & RPA': ['Automation Anywhere (Certified)', 'UiPath', 'Robocorp', 'Python Scripting'],
  'Cloud & Infrastructure': ['Microsoft Azure (AZ-900)', 'AWS (VPC, Subnets, Route Tables, Security Groups, NACLs, IAM)', 'Docker', 'CI/CD', 'Vercel', 'Linux'],
  Languages: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'SQL', 'Bash'],
  Frontend: ['React', 'Next.js', 'Redux', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Node.js', 'Express.js', 'RESTful APIs', 'Microservices', 'JWT', 'OAuth 2.0'],
  Data: ['MongoDB', 'MySQL', 'PostgreSQL', 'Relational Schema Design'],
  'Testing & Practice': ['Jest', 'Cypress', 'Pytest', 'TDD', 'Agile / Scrum', 'SOLID', 'Technical Documentation'],
}

// featured: true → full pinned scroll scene. The rest are listed compactly below them.
export const projects = [
  {
    slug: 'credential-management-system',
    featured: true,
    title: 'Credential Management System',
    kind: 'Full-stack platform',
    status: 'live · azure',
    summary:
      'A centralised platform for organisations to securely store, manage and control access to system credentials across organisational units.',
    highlights: [
      'AES-256-CBC encrypted credential storage at rest',
      'Role-based access control across Admin, Management and User tiers',
      'JWT auth with refresh-token rotation and account lockout',
      'Full audit trail for every credential access and change',
      'OWASP-aligned authentication, covered by Jest tests',
    ],
    tech: ['React 18', 'Node.js', 'Express', 'MongoDB', 'JWT', 'RBAC', 'AES-256', 'Jest', 'Azure'],
    github: 'https://github.com/Demayne/Credential-Management-System',
  },
  {
    slug: 'invoice-approval-workflow',
    featured: true,
    title: 'Enterprise Invoice Approval Workflow',
    kind: 'Low-code BPM application',
    status: 'in progress · aurachain',
    summary:
      'An end-to-end supplier invoice registration and approval process on the Aurachain BPM platform, with tiered approvals, escalation for high-value invoices and a tamper-proof audit trail.',
    highlights: [
      'Role-based task routing across three approval tiers',
      'Threshold-driven escalation gateway for high-value transactions',
      'Append-only audit trail of actor, timestamp and decision on every action',
      'Three-layer validation plus idempotent duplicate-invoice checks',
      'Architectural decisions log defending each design choice to the client',
    ],
    tech: ['Aurachain', 'BPM', 'Process Design', 'Logic Scripting', 'Data Store Modelling', 'Gateways'],
    github: null,
    note: 'aurachain platform',
  },
  {
    slug: 'project-management-system',
    featured: true,
    title: 'Project Management System',
    kind: 'Full-stack application',
    summary:
      'A project management tool built on a normalised relational schema, with task tracking and team collaboration features.',
    highlights: [
      'Normalised MySQL schema for projects, tasks and teams',
      'Node.js data layer with parameterised queries',
      'Task tracking and collaboration workflows',
    ],
    tech: ['React', 'MySQL', 'Node.js', 'Express', 'REST API'],
    github: 'https://github.com/Demayne/Database-Project-Management-System',
  },
  {
    slug: 'timesheet-email-system',
    featured: true,
    title: 'Timesheet Email Processing System',
    kind: 'Enterprise automation',
    status: 'production · ciba industries',
    summary:
      'An automated system that parses timesheet emails, populates the database, calculates payments and routes approvals, replacing a manual payroll process.',
    highlights: [
      'Payroll processing cut from 4+ hours to under 5 minutes (85% less manual work)',
      'Python parsing algorithm with 99.9% accuracy, validated with Pytest',
      'Payroll discrepancies reduced by 95%',
    ],
    tech: ['Python', 'Automation Anywhere', 'Pytest', 'Email Parsing', 'Database'],
    github: null,
  },
  {
    slug: 'github-user-search',
    title: 'GitHub User Search',
    kind: 'Frontend application',
    summary:
      'An interactive client for searching GitHub users and exploring their profiles, repositories and statistics.',
    highlights: ['GitHub REST API integration', 'Profile, repository and stats views'],
    tech: ['React', 'GitHub API', 'JavaScript', 'CSS3'],
    github: 'https://github.com/Demayne/Github-User-Search-App',
  },
  {
    slug: 'react-hangman',
    title: 'React Hangman',
    kind: 'Interactive game',
    summary: 'The classic word game rebuilt in React with considered state management and animation.',
    highlights: ['Predictable game state with React hooks', 'Animated feedback on every guess'],
    tech: ['React', 'JavaScript', 'CSS3'],
    github: 'https://github.com/Demayne/react-hangman-game',
  },
  {
    slug: 'live-project-portfolio',
    title: 'Live Project Portfolio',
    kind: 'Project collection',
    summary:
      'A continuously updated collection of real-world full-stack builds spanning React, Laravel, MySQL, AJAX, Node.js and authentication.',
    highlights: ['Breadth across PHP and JavaScript ecosystems', 'Authentication and data-driven features'],
    tech: ['React', 'Laravel', 'MySQL', 'AJAX', 'Node.js', 'Express'],
    github: 'https://github.com/Demayne/Demayne',
  },
]

// Hands-on AWS labs from NextWork, summarised from the write-ups in public/Nextwork Projects.
export const cloudProjects = [
  {
    slug: 'aws-networks-vpc',
    title: 'Build a Virtual Private Cloud',
    focus: 'AWS networking',
    duration: '~1 hour',
    summary:
      'Built a VPC from scratch in the AWS console, divided it into subnets and attached an internet gateway so resources inside can reach the internet.',
    highlights: [
      'Planned the VPC address space with an IPv4 CIDR block',
      'Created a public subnet with auto-assigned public IPv4 addresses',
      'Attached an internet gateway, the component that makes a subnet public',
    ],
    learned:
      'Why every account ships with a default VPC, and how spreading subnets across Availability Zones keeps applications running if one zone goes down.',
    tech: ['Amazon VPC', 'Subnets', 'Internet Gateway', 'CIDR', 'Availability Zones'],
    writeup: '/aws-labs/legendary-aws-networks-vpc.pdf',
  },
  {
    slug: 'aws-networks-security',
    title: 'VPC Traffic Flow and Security',
    focus: 'AWS networking & security',
    duration: '2 hours',
    summary:
      'Took a subnet from private to public and then locked it down, combining route tables with two independent layers of firewall: a security group at the resource and a network ACL at the subnet boundary.',
    highlights: [
      'Route table entry sending 0.0.0.0/0 through the internet gateway, the step that actually makes a subnet public',
      'Security group allowing inbound HTTP on port 80, with the default allow-all outbound left in place',
      'Custom network ACL applying broad allow and deny rules across the whole subnet',
    ],
    learned:
      'Security groups are stateful and wrap a resource; network ACLs are stateless and guard the subnet. Attaching an internet gateway is not enough on its own, the route table has to give traffic a path to it.',
    tech: ['Amazon VPC', 'Route Tables', 'Internet Gateway', 'Security Groups', 'Network ACLs'],
    writeup: '/aws-labs/legendary-aws-networks-security.pdf',
  },
  {
    slug: 'aws-networks-private',
    title: 'Creating a Private Subnet',
    focus: 'AWS networking',
    duration: '90 minutes',
    summary:
      'Extended the VPC with an isolated private subnet for sensitive resources such as databases, reachable from inside the VPC but never from the internet.',
    highlights: [
      'Dedicated route table with a local-only route and no path to an internet gateway',
      'Custom network ACL starting from deny-all, inbound and outbound',
      'Non-overlapping CIDR blocks so public and private subnets route correctly',
    ],
    learned:
      'A default network ACL allows all traffic, while a custom one denies everything. Private subnets need that explicit, deny-first starting point.',
    tech: ['Amazon VPC', 'Route Tables', 'Network ACLs', 'Private Subnets'],
    writeup: '/aws-labs/legendary-aws-networks-private-subnets.pdf',
  },
  {
    slug: 'aws-security-iam',
    title: 'Cloud Security with AWS IAM',
    focus: 'AWS security',
    duration: '~2 hours',
    summary:
      'Locked down a development and production EC2 setup with IAM, so a new intern can manage the development environment but cannot touch production.',
    highlights: [
      'Tagged EC2 instances by environment to drive access decisions',
      'Wrote a JSON policy: allow EC2 actions on development resources, explicitly deny tag changes',
      'Created an intern user group, an IAM user and an account alias for simpler sign-in',
      'Verified it live: stopping production was denied, stopping development succeeded',
      'Confirmed policy effect with the IAM Policy Simulator before rollout',
    ],
    learned:
      'Least privilege in practice, and that an explicit Deny always overrides an Allow. Testing the policy exposed a gap, which I traced and fixed.',
    tech: ['AWS IAM', 'EC2', 'JSON Policies', 'Policy Simulator', 'Least Privilege'],
    writeup: '/aws-labs/legendary-aws-security-iam.pdf',
  },
]

// Matches Demayne_Govender_Resume_2026: work first, then training.
export const experience = [
  {
    role: 'Technical Operations Analyst (Logistics & Invoicing)',
    company: 'Barnes Black Logistics',
    period: 'Oct 2024 – Jan 2026',
    highlights: [
      'Scoped automation opportunities across logistics workflows, turning operational pain points into structured engineering requirements',
      'Mapped the shipment lifecycle end to end to pinpoint the bottlenecks holding up dispatch and invoicing, then reworked them into documented, repeatable processes',
      'Ran high-volume data workflows for 50+ daily shipments with 99.5% on-time delivery and 100% billing accuracy',
    ],
  },
  {
    role: 'Junior Software Developer',
    company: 'CIBA Industries',
    period: 'Aug 2023 – Dec 2023',
    highlights: [
      'Built a Timesheet Email Processing System (Python, Automation Anywhere), cutting payroll processing from 4+ hours to under 5 minutes',
      'Wrote a parsing algorithm with 99.9% accuracy, validated by Pytest suites, reducing payroll discrepancies by 95%',
      'Optimised RPA infrastructure end to end, lifting uptime from 70% to 99.7% and reclaiming 20+ engineering hours a week',
    ],
  },
  {
    role: 'Software Engineering → Full-Stack Web & Software Engineering',
    company: 'HyperionDev',
    period: 'Jun 2023 – Nov 2025',
    highlights: [
      'Built full-stack applications with React, Node.js, MongoDB and MySQL across both programmes',
      'Built services with JWT auth, RESTful APIs and responsive interfaces',
      'Ranked Top 10 in class across both programmes with a 99% overall average',
    ],
  },
]

export const credentials = [
  {
    title: 'Aurachain Advanced Course',
    issuer: 'Aurachain Academy · low-code BPM process design & development',
    date: 'Aug 2026',
    badge: 'BPM · Advanced',
    pdf: '/Aurachain_Advanced_Course_Certificate.pdf',
  },
  {
    title: 'Aurachain Partner Training Program',
    issuer: 'Aurachain · business process development',
    date: 'Aug 2026',
    badge: 'BPM',
    pdf: '/Aurachain_Partner_Training_Certificate.pdf',
  },
  {
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft · credential id 6086A519BF13ECAC',
    date: 'Mar 2026',
    badge: 'Cloud',
    pdf: '/AZ-900_Azure_Fundamentals_Certificate.pdf',
    portfolio: 'https://learn.microsoft.com/en-us/users/demaynegovender-1047/credentials/certification/azure-fundamentals',
  },
  {
    title: 'Full Stack Web & Software Engineer',
    issuer: 'HyperionDev',
    date: 'Nov 2025',
    badge: 'Top 10 · 99%',
    pdf: '/Full_Stack_Certificate.pdf',
    portfolio: 'https://www.hyperiondev.com/portfolio/DG23030008394/',
  },
  {
    title: 'Software Engineer Bootcamp',
    issuer: 'HyperionDev',
    date: 'Jan 2024',
    badge: 'Top 10',
    pdf: '/Software_Engineer_Certificate.pdf',
    portfolio: 'https://www.hyperiondev.com/portfolio/DG24070015238/',
  },
  {
    title: 'Robotic Process Automation Professional',
    issuer: 'Automation Anywhere · enterprise RPA design & deployment',
    date: 'Nov 2023',
    pdf: '/AA_RPA_Certificate.pdf',
  },
]
