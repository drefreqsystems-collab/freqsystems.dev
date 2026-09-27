"""Placeholder plates for the local harness (the real images are binary files in the Vercel store,
not in git). fixtures/ mirrors the baseline deployment; fixtures_after/ adds the step-02 aliases
assets/crane.jpg and assets/cargo.jpg. Known-dead references (hero-core.jpg, *.png chains) are
deliberately absent so they 404 exactly as they do in production. Requires Pillow."""
import os, shutil
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
F = os.path.join(HERE, 'fixtures'); A = os.path.join(HERE, 'fixtures_after')
IMGS = ['architecture-diagram.jpg', 'ballast.jpg', 'brand-poster.jpg', 'contact-hero.jpg', 'final-survey.jpg',
        'founder-portrait-v2.jpg', 'freq-emblem.jpg', 'hero-barge.jpg', 'investor-hero.jpg', 'og-poster.jpg',
        'phase-03-crane.jpg', 'phase-04-cargo-v2.jpg', 'phase-05-trim.jpg', 'pre-survey.jpg', 'sim-barge-402.jpg']
os.makedirs(os.path.join(F, 'assets'), exist_ok=True)
for n in IMGS:
    im = Image.new('RGB', (1200, 800), (8, 12, 24)); d = ImageDraw.Draw(im)
    for y in range(800): d.line([(0, y), (1200, y)], fill=(8 + y // 40, 12 + y // 30, 24 + y // 20))
    d.rectangle([0, 520, 1200, 800], fill=(5, 8, 15)); d.rectangle([380, 470, 860, 540], fill=(27, 34, 44), outline=(99, 102, 241))
    d.text((24, 24), 'TEST FIXTURE  assets/' + n, fill=(138, 151, 173))
    im.save(os.path.join(F, 'assets', n), 'JPEG', quality=80)
for n, s in [('favicon-16.png', 16), ('favicon-32.png', 32), ('apple-touch-icon.png', 180)]:
    for base in (F, os.path.join(F, 'assets')): Image.new('RGB', (s, s), (8, 12, 24)).save(os.path.join(base, n))
shutil.rmtree(A, ignore_errors=True); shutil.copytree(F, A)
shutil.copy(os.path.join(A, 'assets', 'phase-03-crane.jpg'), os.path.join(A, 'assets', 'crane.jpg'))
shutil.copy(os.path.join(A, 'assets', 'phase-04-cargo-v2.jpg'), os.path.join(A, 'assets', 'cargo.jpg'))
print('fixtures ready')
