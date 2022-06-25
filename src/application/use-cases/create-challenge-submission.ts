import { Submission } from "../../domain/entities/submission";
import { ChallengesRepository } from "../repositories/ChallengeRepository";
import { StudentsRepository } from "../repositories/StudentsRepository";

type CreateChallengeSubmissionRequest = {
    studentId: string;
    challengeId: string;
};

export class CreateChallengeSubmission {
    constructor(
        private readonly studentsRepository: StudentsRepository,
        private readonly challengesRepository: ChallengesRepository
    ) {}

    async execute({
        studentId,
        challengeId,
    }: CreateChallengeSubmissionRequest) {
        const student = await this.studentsRepository.findById(studentId);

        if (!student) {
            throw new Error("Student does not exists");
        }

        const challenge = await this.challengesRepository.findById(challengeId);

        if (!challenge) {
            throw new Error("challenge does not exists");
        }

        const submission = Submission.create({
            challengeId,
            studentId: studentId,
            createdAt: new Date(),
        });

        return submission;
    }
}
