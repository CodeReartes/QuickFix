# Security Specification: QuickFix

## 1. Data Invariants
- A **JobRequest** must have a valid `clientId` matching the creator.
- A **professional** can only access job details for jobs they have accepted or are near (nearby listing).
- **Messages** can only be sent by the `clientId` or `professionalId` associated with the job.
- **Reviews** can only be created by the client who requested the job, and only after the job status is `completed`.
- Users cannot modify their own `role` after creation (immutability).
- Terminal status `completed` or `cancelled` locks the JobRequest from further updates.

## 2. The "Dirty Dozen" Payloads (Test Scenarios)
1. **Identity Spoofing**: User A creates a job with `clientId: UserB`.
2. **Privilege Escalation**: User A updates their role from `client` to `admin` (or `professional`).
3. **Unauthorized Read**: Professional B reads messages for a job assigned to Professional A.
4. **Invalid State Transition**: Client updates job status from `pending` directly to `completed`.
5. **Orphaned Write**: Creating a Review for a non-existent `jobId`.
6. **Resource Poisoning**: Sending a 1MB string in the `description` field.
7. **Bypassing Immutability**: Professional tries to change the `clientId` of an accepted job.
8. **Spam Attack**: Sending 1000 messages in 1 second (rate limiting via rules if possible, or cost guard).
9. **Illicit Assignment**: Professional A "accepts" a job that is already `in_progress` by Professional B.
10. **Review Fraud**: Client leaves a review for a job that is still `pending`.
11. **PII Leak**: Random user lists all `users` collection to scrape emails.
12. **Double Acceptance**: Two professionals try to accept the same job at the same time (atomicity check).

## 3. Test Runner Plan
I will create `firestore.rules.test.ts` to verify that these payloads are rejected.
