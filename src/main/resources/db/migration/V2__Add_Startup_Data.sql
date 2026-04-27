-- Insert the partner first so we can reference their id
INSERT INTO partner (name, role)
VALUES ('Keno Deary', 'General Partner');

-- Insert startups, all linked to Keno Deary
INSERT INTO startup (name, sector, series, eval, equity, funds_accrued, projected_close, stage, partner_id)
VALUES ('Google', 'Tech', NULL, 9.5, 3, 500, '02 APR 26', 'Series A',
        (SELECT id FROM partner WHERE name = 'Keno Deary')),
       ('Stripe', 'FinTech', NULL, 9.0, 12, 200, '15 MAY 26', 'Preseed',
        (SELECT id FROM partner WHERE name = 'Keno Deary')),
       ('Palantir', 'DefenseTech', NULL, 8.7, 9, 750, '10 JUN 26', 'Seed',
        (SELECT id FROM partner WHERE name = 'Keno Deary')),
       ('Anthropic', 'AI', NULL, 9.8, 5, 1500, '01 AUG 26', 'Series A',
        (SELECT id FROM partner WHERE name = 'Keno Deary')),
       ('SpaceX', 'Space', NULL, 7.8, 14, 150, '02 APR 26', 'Preseed',
        (SELECT id FROM partner WHERE name = 'Keno Deary')),
       ('Tesla', 'Tech', NULL, 6.5, 13, 250, '15 MAY 26', 'Preseed',
        (SELECT id FROM partner WHERE name = 'Keno Deary')),
       ('Figma', 'SaaS', NULL, 8.8, 8, 600, '10 JUN 26', 'Seed', (SELECT id FROM partner WHERE name = 'Keno Deary')),
       ('OpenAI', 'AI', NULL, 9.2, 4, 4500, '01 AUG 26', 'Series B',
        (SELECT id FROM partner WHERE name = 'Keno Deary')),
       ('Coinbase', 'FinTech', NULL, 7.5, 5, 3200, '02 APR 26', 'Series B',
        (SELECT id FROM partner WHERE name = 'Keno Deary')),
       ('Notion', 'SaaS', NULL, 8.7, 9, 750, '10 JUN 26', 'Seed',
        (SELECT id FROM partner WHERE name = 'Keno Deary')),
       ('Slack', 'SaaS', NULL, 8.7, 2, 25000, '10 JUN 26', 'Exit', (SELECT id FROM partner WHERE name = 'Keno Deary')),
       ('Allbirds', 'AI', NULL, 8.5, 3, 9500, '01 AUG 26', 'Series C',
        (SELECT id FROM partner WHERE name = 'Keno Deary'));

INSERT INTO startup_founders (startup_id, founder_name)
VALUES (1, 'Larry Page'),
       (1, 'Sergey Brin');

INSERT INTO startup_founders (startup_id, founder_name)
VALUES (2, 'Patrick Collison'),
       (2, 'John Collison');

INSERT INTO funding_by_round (startup_id, round_name, amount)
VALUES (1, 'Preseed', 100000),
       (1, 'Seed', 200000);