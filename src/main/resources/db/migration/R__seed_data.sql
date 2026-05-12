-- Repeatable migration: truncate first so re-runs stay clean
TRUNCATE funding_by_round, application_founders, startup_founders, application, startup, partner RESTART IDENTITY CASCADE;

-- ============================================================
-- PARTNERS
-- ============================================================
INSERT INTO partner (name, role)
VALUES ('Keno Deary', 'General Partner'),
       ('Marc Andreessen', 'General Partner'),
       ('Peter Fenton', 'General Partner'),
       ('Paul Graham', 'General Partner'),
       ('Michael Moritz', 'General Partner');

-- ============================================================
-- STARTUPS
-- ============================================================
INSERT INTO startup (name, sector, series, eval, equity, funds_accrued, projected_close, stage, partner_id)
VALUES
    ('Google', 'Tech', NULL, 9.8, 3, 25, '02 APR 26', 'Series A',
     (SELECT id FROM partner WHERE name = 'Michael Moritz')),

    ('Stripe', 'FinTech', NULL, 9.4, 12, 2300, '15 MAY 26', 'Preseed',
     (SELECT id FROM partner WHERE name = 'Paul Graham')),

    ('Palantir', 'DefenseTech', NULL, 8.9, 9, 3000, '10 JUN 26', 'Seed',
     (SELECT id FROM partner WHERE name = 'Keno Deary')),

    ('Anthropic', 'AI', NULL, 9.5, 5, 7700, '01 AUG 26', 'Series A',
     (SELECT id FROM partner WHERE name = 'Marc Andreessen')),

    ('SpaceX', 'Space', NULL, 9.9, 14, 9000, '02 APR 26', 'Preseed',
     (SELECT id FROM partner WHERE name = 'Keno Deary')),

    ('Tesla', 'Tech', NULL, 8.6, 13, 190, '15 MAY 26', 'Preseed',
     (SELECT id FROM partner WHERE name = 'Keno Deary')),

    ('Figma', 'SaaS', NULL, 9.2, 8, 333, '10 JUN 26', 'Seed',
     (SELECT id FROM partner WHERE name = 'Peter Fenton')),

    ('OpenAI', 'AI', NULL, 9.7, 4, 11000, '01 AUG 26', 'Series B',
     (SELECT id FROM partner WHERE name = 'Marc Andreessen')),

    ('Coinbase', 'FinTech', NULL, 8.1, 5, 547, '02 APR 26', 'Series B',
     (SELECT id FROM partner WHERE name = 'Peter Fenton')),

    ('Notion', 'SaaS', NULL, 8.8, 9, 343, '10 JUN 26', 'Seed',
     (SELECT id FROM partner WHERE name = 'Paul Graham')),

    ('Slack', 'SaaS', NULL, 8.5, 2, 1400, '10 JUN 26', 'Exit',
     (SELECT id FROM partner WHERE name = 'Peter Fenton')),

    ('Allbirds', 'Consumer', NULL, 6.2, 3, 200, '01 AUG 26', 'Series C',
     (SELECT id FROM partner WHERE name = 'Keno Deary'));
-- ============================================================
-- STARTUP FOUNDERS
-- ============================================================
INSERT INTO startup_founders (startup_id, founder_name)
VALUES ((SELECT id FROM startup WHERE name = 'Google'), 'Larry Page'),
       ((SELECT id FROM startup WHERE name = 'Google'), 'Sergey Brin'),
       ((SELECT id FROM startup WHERE name = 'Stripe'), 'Patrick Collison'),
       ((SELECT id FROM startup WHERE name = 'Stripe'), 'John Collison'),
       ((SELECT id FROM startup WHERE name = 'Palantir'), 'Peter Thiel'),
       ((SELECT id FROM startup WHERE name = 'Palantir'), 'Alex Karp'),
       ((SELECT id FROM startup WHERE name = 'Palantir'), 'Joe Lonsdale'),
       ((SELECT id FROM startup WHERE name = 'Anthropic'), 'Dario Amodei'),
       ((SELECT id FROM startup WHERE name = 'Anthropic'), 'Daniela Amodei'),
       ((SELECT id FROM startup WHERE name = 'SpaceX'), 'Elon Musk'),
       ((SELECT id FROM startup WHERE name = 'Tesla'), 'Martin Eberhard'),
       ((SELECT id FROM startup WHERE name = 'Tesla'), 'Marc Tarpenning'),
       ((SELECT id FROM startup WHERE name = 'Tesla'), 'Elon Musk'),
       ((SELECT id FROM startup WHERE name = 'Figma'), 'Dylan Field'),
       ((SELECT id FROM startup WHERE name = 'Figma'), 'Evan Wallace'),
       ((SELECT id FROM startup WHERE name = 'OpenAI'), 'Sam Altman'),
       ((SELECT id FROM startup WHERE name = 'OpenAI'), 'Greg Brockman'),
       ((SELECT id FROM startup WHERE name = 'OpenAI'), 'Ilya Sutskever'),
       ((SELECT id FROM startup WHERE name = 'Coinbase'), 'Brian Armstrong'),
       ((SELECT id FROM startup WHERE name = 'Coinbase'), 'Fred Ehrsam'),
       ((SELECT id FROM startup WHERE name = 'Notion'), 'Ivan Zhao'),
       ((SELECT id FROM startup WHERE name = 'Notion'), 'Simon Last'),
       ((SELECT id FROM startup WHERE name = 'Slack'), 'Stewart Butterfield'),
       ((SELECT id FROM startup WHERE name = 'Slack'), 'Cal Henderson'),
       ((SELECT id FROM startup WHERE name = 'Slack'), 'Eric Costello'),
       ((SELECT id FROM startup WHERE name = 'Allbirds'), 'Tim Brown'),
       ((SELECT id FROM startup WHERE name = 'Allbirds'), 'Joey Zwillinger');

-- ============================================================
-- FUNDING BY ROUND  (amounts in USD)
-- ============================================================
INSERT INTO funding_by_round (startup_id, round_name, amount)
VALUES
    -- Google
    ((SELECT id FROM startup WHERE name = 'Google'), 'Preseed', 100000),
    ((SELECT id FROM startup WHERE name = 'Google'), 'Seed', 1000000),
    ((SELECT id FROM startup WHERE name = 'Google'), 'Series A', 25000000),

    -- Stripe
    ((SELECT id FROM startup WHERE name = 'Stripe'), 'Preseed', 150000),
    ((SELECT id FROM startup WHERE name = 'Stripe'), 'Seed', 2000000),

    -- Palantir
    ((SELECT id FROM startup WHERE name = 'Palantir'), 'Preseed', 500000),
    ((SELECT id FROM startup WHERE name = 'Palantir'), 'Seed', 7500000),

    -- Anthropic
    ((SELECT id FROM startup WHERE name = 'Anthropic'), 'Preseed', 500000),
    ((SELECT id FROM startup WHERE name = 'Anthropic'), 'Seed', 7400000),
    ((SELECT id FROM startup WHERE name = 'Anthropic'), 'Series A', 124000000),

    -- SpaceX
    ((SELECT id FROM startup WHERE name = 'SpaceX'), 'Preseed', 100000000),

    -- Tesla
    ((SELECT id FROM startup WHERE name = 'Tesla'), 'Preseed', 7500000),

    -- Figma
    ((SELECT id FROM startup WHERE name = 'Figma'), 'Preseed', 3900000),
    ((SELECT id FROM startup WHERE name = 'Figma'), 'Seed', 14000000),

    -- OpenAI
    ((SELECT id FROM startup WHERE name = 'OpenAI'), 'Preseed', 1000000),
    ((SELECT id FROM startup WHERE name = 'OpenAI'), 'Seed', 130000000),
    ((SELECT id FROM startup WHERE name = 'OpenAI'), 'Series A', 300000000),
    ((SELECT id FROM startup WHERE name = 'OpenAI'), 'Series B', 10000000000),

    -- Coinbase
    ((SELECT id FROM startup WHERE name = 'Coinbase'), 'Preseed', 150000),
    ((SELECT id FROM startup WHERE name = 'Coinbase'), 'Seed', 6000000),
    ((SELECT id FROM startup WHERE name = 'Coinbase'), 'Series A', 25000000),
    ((SELECT id FROM startup WHERE name = 'Coinbase'), 'Series B', 75000000),

    -- Notion
    ((SELECT id FROM startup WHERE name = 'Notion'), 'Preseed', 2000000),
    ((SELECT id FROM startup WHERE name = 'Notion'), 'Seed', 10000000),

    -- Slack
    ((SELECT id FROM startup WHERE name = 'Slack'), 'Preseed', 1500000),
    ((SELECT id FROM startup WHERE name = 'Slack'), 'Seed', 17000000),
    ((SELECT id FROM startup WHERE name = 'Slack'), 'Series A', 43000000),
    ((SELECT id FROM startup WHERE name = 'Slack'), 'Series B', 120000000),
    ((SELECT id FROM startup WHERE name = 'Slack'), 'Series C', 160000000),

    -- Allbirds
    ((SELECT id FROM startup WHERE name = 'Allbirds'), 'Preseed', 100000),
    ((SELECT id FROM startup WHERE name = 'Allbirds'), 'Seed', 2700000),
    ((SELECT id FROM startup WHERE name = 'Allbirds'), 'Series A', 17500000),
    ((SELECT id FROM startup WHERE name = 'Allbirds'), 'Series B', 50000000),
    ((SELECT id FROM startup WHERE name = 'Allbirds'), 'Series C', 100000000);

-- ============================================================
-- APPLICATIONS
-- ============================================================
INSERT INTO application (name, sector, founder_email, founder_phone_number, target_round,
                         deck_filename, deck_content_type, additional_comments,
                         status, submitted_at)
VALUES ('Google', 'Tech', 'larry@google.com', '6501234567', 'Series A',
        NULL, 'application/pdf', 'Dominating search globally.',
        'PENDING', '2026-01-05 09:00:00'),
       ('Stripe', 'FinTech', 'patrick@stripe.com', '4151234567', 'Preseed',
        NULL, 'application/pdf', 'Payments infrastructure for the internet.',
        'PENDING', '2026-01-08 10:30:00'),
       ('Palantir', 'DefenseTech', 'alex@palantir.com', '3101234567', 'Seed',
        NULL, 'application/pdf', 'Data analytics for gov and enterprise.',
        'APPROVED', '2026-01-12 11:00:00'),
       ('Anthropic', 'AI', 'dario@anthropic.com', '4151239999', 'Series A',
        NULL, 'application/pdf', 'Safety-focused frontier AI lab.',
        'PENDING', '2026-01-15 14:00:00'),
       ('SpaceX', 'Space', 'elon@spacex.com', '3101239998', 'Preseed',
        NULL, 'application/pdf', 'Making humanity multiplanetary.',
        'APPROVED', '2026-01-18 08:00:00'),
       ('Tesla', 'Tech', 'martin@tesla.com', '6501239997', 'Preseed',
        NULL, 'application/pdf', 'Accelerating sustainable energy.',
        'PENDING', '2026-01-20 09:30:00'),
       ('Figma', 'SaaS', 'dylan@figma.com', '4151237777', 'Seed',
        NULL, 'application/pdf', 'Collaborative design tool for teams.',
        'PENDING', '2026-01-22 13:00:00'),
       ('OpenAI', 'AI', 'sam@openai.com', '6501236666', 'Series B',
        NULL, 'application/pdf', 'AGI for the benefit of all humanity.',
        'APPROVED', '2026-01-25 10:00:00'),
       ('Coinbase', 'FinTech', 'brian@coinbase.com', '4151235555', 'Series B',
        NULL, 'application/pdf', 'Trusted crypto exchange and wallet.',
        'APPROVED', '2026-01-28 11:30:00'),
       ('Notion', 'SaaS', 'ivan@notion.so', '4151234444', 'Seed',
        NULL, 'application/pdf', 'All-in-one workspace for teams.',
        'PENDING', '2026-02-01 09:00:00'),
       ('Slack', 'SaaS', 'stewart@slack.com', '4151233333', 'Series C',
        NULL, 'application/pdf', 'Team messaging and workflow platform.',
        'APPROVED', '2026-02-03 14:30:00'),
       ('Allbirds', 'AI', 'tim@allbirds.com', '4151232222', 'Series C',
        NULL, 'application/pdf', 'Sustainable direct-to-consumer footwear.',
        'APPROVED', '2026-02-05 10:00:00');

-- ============================================================
-- APPLICATION FOUNDERS
-- ============================================================
INSERT INTO application_founders (application_id, founder_name)
VALUES ((SELECT id FROM application WHERE name = 'Google'), 'Larry Page'),
       ((SELECT id FROM application WHERE name = 'Google'), 'Sergey Brin'),
       ((SELECT id FROM application WHERE name = 'Stripe'), 'Patrick Collison'),
       ((SELECT id FROM application WHERE name = 'Stripe'), 'John Collison'),
       ((SELECT id FROM application WHERE name = 'Palantir'), 'Peter Thiel'),
       ((SELECT id FROM application WHERE name = 'Palantir'), 'Alex Karp'),
       ((SELECT id FROM application WHERE name = 'Palantir'), 'Joe Lonsdale'),
       ((SELECT id FROM application WHERE name = 'Anthropic'), 'Dario Amodei'),
       ((SELECT id FROM application WHERE name = 'Anthropic'), 'Daniela Amodei'),
       ((SELECT id FROM application WHERE name = 'SpaceX'), 'Elon Musk'),
       ((SELECT id FROM application WHERE name = 'Tesla'), 'Martin Eberhard'),
       ((SELECT id FROM application WHERE name = 'Tesla'), 'Marc Tarpenning'),
       ((SELECT id FROM application WHERE name = 'Tesla'), 'Elon Musk'),
       ((SELECT id FROM application WHERE name = 'Figma'), 'Dylan Field'),
       ((SELECT id FROM application WHERE name = 'Figma'), 'Evan Wallace'),
       ((SELECT id FROM application WHERE name = 'OpenAI'), 'Sam Altman'),
       ((SELECT id FROM application WHERE name = 'OpenAI'), 'Greg Brockman'),
       ((SELECT id FROM application WHERE name = 'OpenAI'), 'Ilya Sutskever'),
       ((SELECT id FROM application WHERE name = 'Coinbase'), 'Brian Armstrong'),
       ((SELECT id FROM application WHERE name = 'Coinbase'), 'Fred Ehrsam'),
       ((SELECT id FROM application WHERE name = 'Notion'), 'Ivan Zhao'),
       ((SELECT id FROM application WHERE name = 'Notion'), 'Simon Last'),
       ((SELECT id FROM application WHERE name = 'Slack'), 'Stewart Butterfield'),
       ((SELECT id FROM application WHERE name = 'Slack'), 'Cal Henderson'),
       ((SELECT id FROM application WHERE name = 'Slack'), 'Eric Costello'),
       ((SELECT id FROM application WHERE name = 'Allbirds'), 'Tim Brown'),
       ((SELECT id FROM application WHERE name = 'Allbirds'), 'Joey Zwillinger');

-- ============================================================
-- STARTUP NOTES
-- ============================================================
INSERT INTO startup_notes (startup_id, startup_notes)
VALUES
    -- Google
    ((SELECT id FROM startup WHERE name = 'Google'), 'Early results on PageRank algorithm show 10x better relevance than AltaVista.'),
    ((SELECT id FROM startup WHERE name = 'Google'), 'Scalability concerns regarding index storage; need to optimize hardware costs.'),
    ((SELECT id FROM startup WHERE name = 'Google'), 'Exploring potential monetization through keyword-based advertising (AdWords).'),

    -- Stripe
    ((SELECT id FROM startup WHERE name = 'Stripe'), 'Developer experience is the key moat; APIs are significantly cleaner than competitors.'),
    ((SELECT id FROM startup WHERE name = 'Stripe'), 'High churn risk in small e-commerce tier, but enterprise pipeline looks strong.'),

    -- Palantir
    ((SELECT id FROM startup WHERE name = 'Palantir'), 'Government contracts taking longer to close than anticipated; high CAC.'),
    ((SELECT id FROM startup WHERE name = 'Palantir'), 'Forward Deployed Engineer model is proving effective for customer retention.'),

    -- Anthropic
    ((SELECT id FROM startup WHERE name = 'Anthropic'), 'Claude 3 Opus benchmarks exceed GPT-4 in reasoning; massive compute demand.'),
    ((SELECT id FROM startup WHERE name = 'Anthropic'), 'Focusing on Constitutional AI as a differentiator for enterprise safety.'),

    -- SpaceX
    ((SELECT id FROM startup WHERE name = 'SpaceX'), 'Falcon 1 launch attempts are burning cash rapidly; high-stakes quarter ahead.'),
    ((SELECT id FROM startup WHERE name = 'SpaceX'), 'Vertical integration of manufacturing is providing a 30% margin advantage.'),

    -- OpenAI
    ((SELECT id FROM startup WHERE name = 'OpenAI'), 'Initial transition from non-profit to capped-profit structure complete.'),
    ((SELECT id FROM startup WHERE name = 'OpenAI'), 'ChatGPT growth is unprecedented; server capacity is the current primary bottleneck.'),

    -- Figma
    ((SELECT id FROM startup WHERE name = 'Figma'), 'Browser-based performance is impressive; catching up to Adobe Creative Cloud usage.'),
    ((SELECT id FROM startup WHERE name = 'Figma'), 'Strong community-led growth via the community plugin marketplace.'),

    -- Notion
    ((SELECT id FROM startup WHERE name = 'Notion'), 'Bouncing back from 2021 outages; infrastructure has been significantly hardened.'),
    ((SELECT id FROM startup WHERE name = 'Notion'), 'Excellent horizontal use-case penetration across design, eng, and HR teams.'),

    -- Allbirds
    ((SELECT id FROM startup WHERE name = 'Allbirds'), 'DTC margins under pressure due to rising supply chain costs.'),
    ((SELECT id FROM startup WHERE name = 'Allbirds'), 'Product expansion into apparel has had mixed early reviews; need to refocus on core footwear.');
