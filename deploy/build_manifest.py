"""Write deploy/manifest.json: every path in the Vercel deployment with its SHA-1.

Text files are hashed from site/ (the repo copy is byte-identical to what Vercel serves).
Binary files are not in the repo; they live in the Vercel team's file store and are
deployed by SHA reference, so their hashes are recorded here as the source of truth.
Usage: python3 deploy/build_manifest.py <step>   (step: 01 | 02 | 03)
"""
import hashlib, json, os, sys

STEP = sys.argv[1] if len(sys.argv) > 1 else '03'
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SITE = os.path.join(ROOT, 'site')

# Binary files, from the Vercel file tree of baseline deployment dpl_9frhjqZ7DK6dVqVULkbpjM9tnC94.
BINARY = {
    'favicon-16.png': '660fbd5381fb6af163c183cfda2f6289eb7844bd',
    'favicon-32.png': '7ab4f08e18bcabe58eed88d644977c0ac5a7a75e',
    'apple-touch-icon.png': 'ffafed8a389a2ce1e7f706b2b9e7e24a1a00102d',
    'assets/apple-touch-icon.png': '465f2eb38d57989bfc5a2bca42ea57ebe3fe428f',
    'assets/favicon-16.png': '01b887d869822c90302ab0c92c0b74b1d3ec06ee',
    'assets/favicon-32.png': '6e89f189ba5b09c7ea01fc685118d142a024bd47',
    'assets/architecture-diagram.jpg': 'bd111addbf53fdedf3ce1a7792add51034745a3f',
    'assets/ballast.jpg': '3ef1e3dc4c5c9f2f4ac76ed47de5dccf91631d19',
    'assets/brand-poster.jpg': '499841fdeaa29bd6c78af4c0a3175e740cac8592',
    'assets/contact-hero.jpg': '0657af90b913b63ad0f12604e6b0a101a702c174',
    'assets/final-survey.jpg': '807cdd883e19a540fffcabf9f80ee7065782711e',
    'assets/founder-portrait-v2.jpg': 'd9eb714942c648c213e498dd54bc71bd85e93285',
    'assets/freq-emblem.jpg': 'f96da6201a3a958d0c30ccbc0dff1e8dea9f43c4',
    'assets/hero-barge.jpg': '9bcf1e0001b938c9b2587a52cb9d5ccec5c1aca0',
    'assets/investor-hero.jpg': '85e37f4ade8fff8a9669c03ec2bf74fc047c2abd',
    'assets/og-poster.jpg': '9575a4497fc5e77c9cc1c5a498f6c6ffb7c949e9',
    'assets/phase-03-crane.jpg': '27f15d2dba9c89422cc2896ffd39cbb83cd79275',
    'assets/phase-04-cargo-v2.jpg': '65ded16a635b44305b34cfc5ad7bfd5de7b5cb17',
    'assets/phase-05-trim.jpg': '17be9dfcf39236a2c04945606142d11162fec58c',
    'assets/pre-survey.jpg': 'fca581bb30dfccc0cca9141067da4099affc860c',
    'assets/sim-barge-402.jpg': '3e904040ae12db0eef3d82acb7bbbf5b8e289a5c',
}
# Step 02 only: PhaseScene's preference chains asked for assets/crane.jpg and assets/cargo.jpg first,
# so they were deployed as new paths over the phase-03 / phase-04 renders. Step 03 removes the survey
# view, nothing renders PhaseScene any more, and the two alias paths are gone again.
ALIASES = {'assets/crane.jpg': 'assets/phase-03-crane.jpg', 'assets/cargo.jpg': 'assets/phase-04-cargo-v2.jpg'} if STEP == '02' else {}

def prod(step):
    """Label for a step's production deployment, as seen from STEP: the previous step is the rollback target."""
    if step == STEP:
        return 'production (current)'
    return 'production (superseded; instant-rollback target)' if int(step) == int(STEP) - 1 else 'production (superseded)'

DEPLOYMENTS = [
    {'step': '01', 'id': 'dpl_A4DKwZ6rDBYQB4vZ9bJFc8EQkLGw', 'target': prod('01'),
     'url': 'https://frequency-tera-optimized-7p4pwrnng-freq-systems.vercel.app', 'what': 'byte-identical clone of frequency-mega'},
]
if STEP >= '02':
    DEPLOYMENTS += [
        {'step': '02', 'id': 'dpl_AwdkZ5xVgGSjKBrZ8pFr1NCtZTri', 'target': 'preview',
         'url': 'https://frequency-tera-optimized-1ohhgeoyv-frequency-electro.vercel.app', 'what': 'validation deployment for step 02'},
        {'step': '02', 'id': 'dpl_71fXbMXmLCt92HSbdXQe9K8uhGkt', 'target': prod('02'),
         'url': 'https://frequency-tera-optimized-40ex9gz7n-frequency-electro.vercel.app' if STEP >= '03' else 'https://frequency-tera-optimized.vercel.app',
         'what': 'same SHA set as the step-02 preview'},
    ]
if STEP >= '03':
    DEPLOYMENTS += [
        {'step': '03', 'id': 'dpl_4ZUoCSvjeC798CqZsmndNsz6saDS', 'target': 'preview',
         'url': 'https://frequency-tera-optimized-84brkg6nk-frequency-electro.vercel.app', 'what': 'validation deployment for step 03'},
        {'step': '03', 'id': 'dpl_HUBqxDSRLqCNPkBUczGtngUajDpj', 'target': prod('03'),
         'url': 'https://frequency-tera-optimized.vercel.app', 'what': 'same SHA set as the step-03 preview'},
    ]

files = []
for dirpath, _, names in os.walk(SITE):
    for n in names:
        p = os.path.join(dirpath, n)
        rel = os.path.relpath(p, SITE).replace(os.sep, '/')
        b = open(p, 'rb').read()
        files.append({'path': rel, 'sha1': hashlib.sha1(b).hexdigest(), 'bytes': len(b), 'inRepo': True})
for rel, sha in BINARY.items():
    files.append({'path': rel, 'sha1': sha, 'inRepo': False})
for rel, src in ALIASES.items():
    files.append({'path': rel, 'sha1': BINARY[src], 'inRepo': False, 'aliasOf': src})
files.sort(key=lambda f: f['path'])

manifest = {
    'project': {'name': 'frequency-tera-optimized', 'id': 'prj_uFfwXlhNVcaVosfRrkp6Iy49lnUH',
                'team': 'team_X5LI2up5bH06FG6XJI2w5ToR', 'productionUrl': 'https://frequency-tera-optimized.vercel.app'},
    'step': STEP,
    'baselineSource': {'project': 'frequency-mega', 'deployment': 'dpl_9frhjqZ7DK6dVqVULkbpjM9tnC94'},
    'deployments': DEPLOYMENTS,
    'fileCount': len(files),
    'files': files,
}
out = os.path.join(ROOT, 'deploy', 'manifest.json')
open(out, 'w').write(json.dumps(manifest, indent=2) + '\n')
print(f'wrote {out}: {len(files)} files ({sum(f["inRepo"] for f in files)} in repo)')
