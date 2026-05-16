from django.core.management.base import BaseCommand
from apps.services.models import Service
from apps.core.models import SiteSettings, ClientLogo
from apps.pricing.models import PricingPlan, PricingFeatureGroup, PricingFeature
from apps.portfolio.models import Project
from apps.blog.models import BlogPost


class Command(BaseCommand):
    help = 'Seed initial data for development'

    def handle(self, *args, **options):
        SiteSettings.objects.all().delete()
        settings = SiteSettings.objects.create(
            company_name='EliteTech',
            tagline='We build products that scale and convert.',
            hero_title='We build digital products that win trust.',
            hero_subtitle='From websites to platforms, we help ambitious businesses launch faster and look world-class.',
            about_summary='EliteTech is a design-led engineering studio focused on building fast, premium digital experiences.',
            email='hello@elitetech.com',
            phone='+977 9867512535',
            whatsapp_number='9779867512535',
            address='Kathmandu, Nepal',
            hours='Sun-Fri, 9:00 AM - 6:00 PM',
            years_experience=10,
            projects_completed=120,
            countries_served=5,
            rating=5.0,
            ceo_name='Achu Dev',
            ceo_role='Founder & CEO',
            ceo_message='We build the kind of digital presence that makes businesses feel inevitable.',
        )

        ClientLogo.objects.all().delete()
        ClientLogo.objects.bulk_create([
            ClientLogo(name='Nova Health', website_url='https://example.com', order=1),
            ClientLogo(name='Apex Retail', website_url='https://example.com', order=2),
            ClientLogo(name='Summit Finance', website_url='https://example.com', order=3),
            ClientLogo(name='Vertex Labs', website_url='https://example.com', order=4),
        ])

        Service.objects.all().delete()
        services = [
            {
                'name': 'Web Development',
                'slug': 'web-development',
                'short_description': 'Modern, fast websites built to convert.',
                'full_description': 'We design and build modern marketing sites, corporate websites, landing pages, and custom web platforms with strong performance, accessibility, and conversion-focused UX. Every build is tailored to your brand and goals.',
                'meta_description': 'Custom web development services for fast, responsive, conversion-focused websites.',
                'order': 1,
            },
            {
                'name': 'UI/UX Design',
                'slug': 'ui-ux-design',
                'short_description': 'Design systems and interfaces that convert.',
                'full_description': 'From wireframes to polished interface systems, we create user journeys that remove friction, build trust, and guide visitors toward action. Design is aligned with business goals, not just aesthetics.',
                'meta_description': 'UI/UX design services for intuitive, premium, and conversion-focused digital products.',
                'order': 2,
            },
            {
                'name': 'App Development',
                'slug': 'app-development',
                'short_description': 'Mobile and cross-platform apps.',
                'full_description': 'We build iOS, Android, and cross-platform applications with robust APIs, scalable architecture, and a product-first mindset. Ideal for startups and growing businesses that need reliable digital products.',
                'meta_description': 'App development services for mobile and cross-platform products built to scale.',
                'order': 3,
            },
            {
                'name': 'SEO & Marketing',
                'slug': 'seo-marketing',
                'short_description': 'Rank, convert, and grow.',
                'full_description': 'Our SEO and marketing services combine technical search optimization, content strategy, local SEO, and analytics-driven improvements to generate qualified traffic and measurable growth.',
                'meta_description': 'SEO and digital marketing services to improve rankings, traffic, and conversions.',
                'order': 4,
            },
            {
                'name': 'Web Security',
                'slug': 'web-security',
                'short_description': 'Protect your brand and users.',
                'full_description': 'We audit, harden, and monitor websites and web apps to reduce risk. Services include secure configuration, vulnerability checks, access control guidance, and production hardening best practices.',
                'meta_description': 'Website security services to protect digital products and user data.',
                'order': 5,
            },
            {
                'name': 'Cloud Solutions',
                'slug': 'cloud-solutions',
                'short_description': 'Scale on reliable infrastructure.',
                'full_description': 'We help teams deploy, monitor, and scale applications on modern cloud infrastructure with dependable environments, CI-friendly architecture, and cost-aware operations.',
                'meta_description': 'Cloud solutions services for scalable, reliable, and cost-aware digital infrastructure.',
                'order': 6,
            },
        ]
        for s in services:
            Service.objects.create(**s)

        PricingPlan.objects.all().delete()
        seo_plans = [
            {
                'name': 'Standard', 'slug': 'standard', 'price': 'Rs 20,000/mo', 'tagline': 'Preferred for small businesses', 'featured': False, 'pm': False,
                'groups': [
                    ('Initial website analysis', ['Upto 10 Keyword Ranking', '3 Primary Keywords', '7 Secondary Keywords', 'Site Audit', 'Competitor Analysis', 'Google Analytics Setup', 'Google Search Console Setup', 'Robots.Txt Creation', 'Sitemap Creation']),
                    ('On Page Setup', ['Keyword Research', 'Keyword Mapping', 'Few Major Pages Meta And Heading Tag Optimization', 'URL Optimization', 'Image Optimization', '2 SEO Optimized Blog Articles', 'Few Existing Content Optimization']),
                    ('Technical SEO', ['Canonical URL Addition', 'Custom 404 Page Setup', 'OG Tags', 'Page Redirection', 'Sitemap', 'Robots.Txt', 'Browser Compatibility Check', 'Page Speed Optimization']),
                    ('Off Page SEO', ['Link Building', 'Guest Blogging', 'Directory Submission', 'Quora Posting', 'Reddit Posting', 'Schema Implementation', 'Conversion Tracking', 'Infographic Creation And Sharing']),
                    ('Local SEO', ['GMB Setup & Optimization', 'GMB Posting', 'Google Map Creation', 'Local Citation']),
                    ('Monthly Report', ['Work Done Report', 'On Page Report', 'Backlink Report', 'Traffic By Country', 'Traffic Comparison', 'Top 10 Performing Pages', 'Top 10 Keywords', 'Clicks, Impression, Position']),
                ],
            },
            {
                'name': 'Professional', 'slug': 'professional', 'price': 'Rs 25,000/mo', 'tagline': 'Preferred for mid size businesses', 'featured': True, 'pm': True,
                'groups': [
                    ('Initial website analysis', ['Upto 20 Keyword Ranking', '8 Primary Keywords', '12 Secondary Keywords', 'Site Audit', 'Competitor Analysis', 'Google Analytics Setup', 'Google Search Console Setup', 'Robots.Txt Creation', 'Sitemap Creation']),
                    ('On Page Setup', ['Keyword Research', 'Keyword Mapping', 'Major Pages Meta And Heading Tag Optimization', 'URL Optimization', 'Image Optimization', '4 SEO Optimized Blog Articles', 'Existing Major Page Content Optimization']),
                    ('Technical SEO', ['Canonical URL Addition', 'Custom 404 Page Setup', 'OG Tags', 'Page Redirection', 'Sitemap', 'Robots.Txt', 'Browser Compatibility Check', 'Page Speed Optimization', 'Broken Link Fixing', 'Site Architecture', 'Mobile Friendliness', 'Solve Keyword Cannibalization', 'Bing Webmaster Optimization']),
                    ('Off Page SEO', ['Link Building', 'Guest Blogging', 'Few Directory Submission', 'Few Weekly Post On Quora', 'Few Weekly Post On Reddit', 'Schema Implementation', 'Conversion Tracking', 'Few Infographic Creation And Sharing']),
                    ('Local SEO', ['GMB Setup & Optimization', 'GMB Posting', 'Google Map Creation', 'Few Local Citation']),
                    ('Monthly Report', ['Work Done Report', 'On Page Report', 'Backlink Report', 'Traffic By Country', 'Traffic Comparison', 'Top 10 Performing Pages', 'Top 10 Keywords', 'Clicks, Impression, Position']),
                ],
            },
            {
                'name': 'Premium', 'slug': 'premium', 'price': 'Rs 30,000/mo', 'tagline': 'Preferred for large businesses', 'featured': False, 'pm': True,
                'groups': [
                    ('Initial website analysis', ['Upto 40 Keyword Ranking', '18 Primary Keywords', '22 Secondary Keywords', 'Site Audit', 'Competitor Analysis', 'Google Analytics Setup', 'Google Search Console Setup', 'Robots.Txt Creation', 'Sitemap Creation']),
                    ('On Page Setup', ['Keyword Research', 'Keyword Mapping', 'Major Pages Meta And Heading Tag Optimization', 'URL Optimization', 'Image Optimization', '6 SEO Optimized Blog Articles', 'Existing Major Page Content Optimization']),
                    ('Technical SEO', ['Canonical URL Addition', 'Custom 404 Page Setup', 'OG Tags', 'Page Redirection', 'Sitemap', 'Robots.Txt', 'Browser Compatibility Check', 'Page Speed Optimization', 'Broken Link Fixing', 'Site Architecture', 'Mobile Friendliness', 'Solve Keyword Cannibalization', 'Bing Webmaster Optimization']),
                    ('Off Page SEO', ['Link Building', 'Guest Blogging', 'Few Directory Submission', 'Active On Quora', 'Active On Reddit', 'Schema Implementation', 'Conversion Tracking', 'Monthly 1 Infographic Creation And Sharing']),
                    ('Local SEO', ['GMB Setup & Optimization', 'GMB Posting', 'Google Map Creation', 'Local Citation']),
                    ('Monthly Report', ['Work Done Report', 'On Page Report', 'Backlink Report', 'Traffic By Country', 'Traffic Comparison', 'Top 10 Performing Pages', 'Top 10 Keywords', 'Clicks, Impression, Position']),
                ],
            },
            {
                'name': 'Premium Plus', 'slug': 'premium-plus', 'price': 'Contact Sales', 'tagline': 'Preferred for highly competitive businesses', 'featured': False, 'pm': True,
                'groups': [
                    ('Initial website analysis', ['Upto 60 Keyword Ranking', '25 Primary Keywords', '35 Secondary Keywords', 'Site Audit', 'Competitor Analysis', 'Google Analytics Setup', 'Google Search Console Setup', 'Robots.Txt Creation', 'Sitemap Creation']),
                    ('On Page Setup', ['Keyword Research', 'Keyword Mapping', 'Major Pages Meta And Heading Tag Optimization', 'URL Optimization', 'Image Optimization', '8 SEO Optimized Blog Articles', 'Existing Major Page Content Optimization']),
                    ('Technical SEO', ['Canonical URL Addition', 'Custom 404 Page Setup', 'OG Tags', 'Page Redirection', 'Sitemap', 'Robots.Txt', 'Browser Compatibility Check', 'Page Speed Optimization', 'Broken Link Fixing', 'Site Architecture', 'Mobile Friendliness', 'Solve Keyword Cannibalization', 'Hreflang Tags', 'Competitor Backlink Research', 'Bing And Other Webmaster Optimization']),
                    ('Off Page SEO', ['Link Building', 'Guest Blogging', 'Few Directory Submission', 'Active On Quora', 'Active On Reddit', 'Schema Implementation', 'Conversion Tracking', 'Monthly 1 Infographic Creation And Sharing']),
                    ('Local SEO', ['GMB Setup & Optimization', 'GMB Posting', 'Google Map Creation', 'Local Citation']),
                    ('Monthly Report', ['Work Done Report', 'On Page Report', 'Backlink Report', 'Traffic By Country', 'Traffic Comparison', 'Top 10 Performing Pages', 'Top 10 Keywords', 'Clicks, Impression, Position']),
                ],
            },
        ]

        social_plans = [
            ('Starter Social', 'starter-social', 'Rs 18,000/mo', 'Social media starter pack', False, False, '8 posts/mo', '2 reels/mo', 'Community management'),
            ('Growth Social', 'growth-social', 'Rs 24,000/mo', 'Growing visibility and engagement', True, True, '12 posts/mo', '4 reels/mo', 'Monthly reports'),
            ('Scale Social', 'scale-social', 'Rs 32,000/mo', 'High velocity brand growth', False, True, '16 posts/mo', '6 reels/mo', 'Dedicated PM'),
            ('Enterprise Social', 'enterprise-social', 'Contact Sales', 'Multi-channel social systems', False, True, '20 posts/mo', '8 reels/mo', 'Strategy workshops'),
        ]

        for plan_data in seo_plans:
            plan = PricingPlan.objects.create(
                name=plan_data['name'], slug=plan_data['slug'], category='seo', price=plan_data['price'],
                tagline=plan_data['tagline'], is_featured=plan_data['featured'], has_project_manager=plan_data['pm']
            )
            for group_name, features in plan_data['groups']:
                group = PricingFeatureGroup.objects.create(plan=plan, name=group_name)
                for feature in features:
                    PricingFeature.objects.create(group=group, text=feature, is_included=True)

        for name, slug, price, tagline, featured, pm, feature1, feature2, feature3 in social_plans:
            plan = PricingPlan.objects.create(name=name, slug=slug, category='social', price=price, tagline=tagline, is_featured=featured, has_project_manager=pm)
            group = PricingFeatureGroup.objects.create(plan=plan, name='Core Features')
            PricingFeature.objects.create(group=group, text=feature1, is_included=True)
            PricingFeature.objects.create(group=group, text=feature2, is_included=True)
            PricingFeature.objects.create(group=group, text=feature3, is_included=True)

        Project.objects.all().delete()
        Project.objects.bulk_create([
            Project(title='Example Project', slug='example-project', category='web', description='A sample project', is_featured=True),
            Project(title='Secure SaaS Platform', slug='secure-saas-platform', category='app', description='A modern app platform for enterprise teams.'),
            Project(title='Local SEO Growth', slug='local-seo-growth', category='seo', description='A local SEO campaign that drove qualified leads.'),
        ])

        BlogPost.objects.all().delete()
        BlogPost.objects.bulk_create([
            BlogPost(title='Welcome', slug='welcome', author='Admin', excerpt='Welcome to our blog', body='<p>Hello</p>', category='News'),
            BlogPost(title='How to Choose the Right Web Partner', slug='choose-web-partner', author='Achu Dev', excerpt='Questions to ask before you hire.', body='<p>Choose carefully.</p>', category='Strategy'),
        ])

        # Team
        from apps.team.models import TeamMember
        TeamMember.objects.all().delete()
        TeamMember.objects.create(name='Achu Dev', role='CEO', bio='Founder and CEO', order=1)
        TeamMember.objects.create(name='Maya Shrestha', role='Lead Designer', bio='Design systems and product UX.', order=2)
        TeamMember.objects.create(name='Rohit Khatri', role='Lead Developer', bio='Full-stack engineering and delivery.', order=3)
        TeamMember.objects.create(name='Sara Gurung', role='SEO Strategist', bio='Search growth and content systems.', order=4)

        # Testimonials
        from apps.testimonials.models import Testimonial
        Testimonial.objects.all().delete()
        Testimonial.objects.create(quote='They built our platform end-to-end.', name='Sam', company='Acme Co', rating=5, is_active=True, order=1)
        Testimonial.objects.create(quote='Our new site feels premium and converted better immediately.', name='Nina', company='Summit Finance', rating=5, is_active=True, order=2)
        Testimonial.objects.create(quote='The strategy and execution were both unusually sharp.', name='Aman', company='Vertex Labs', rating=5, is_active=True, order=3)

        self.stdout.write(self.style.SUCCESS('Seeded sample data'))
