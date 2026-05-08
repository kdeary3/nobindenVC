ALTER TABLE startup
    ADD application_id BIGINT;

ALTER TABLE startup
    ADD CONSTRAINT FK_STARTUP_ON_APPLICATION FOREIGN KEY (application_id) REFERENCES application (id);