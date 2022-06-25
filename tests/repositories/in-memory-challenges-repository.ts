import { ChallengesRepository } from "../../src/application/repositories/ChallengeRepository";
import { Challenge } from "../../src/domain/entities/challenge";

export class InMemoryChallengesRepository implements ChallengesRepository {
    public challenges: Challenge[] = [];

    public async findAll(): Promise<Challenge[]> {
        return this.challenges;
    }

    public async findById(id: string): Promise<Challenge | null> {
        const challenge = this.challenges.find(
            (challenge) => challenge.id === id
        );

        if (!challenge) {
            return null;
        }

        return challenge;
    }

    public async create(challenge: Challenge): Promise<Challenge> {
        this.challenges.push(challenge);
        return challenge;
    }

    public async update(challenge: Challenge): Promise<Challenge> {
        const index = this.challenges.findIndex((s) => s.id === challenge.id);
        this.challenges[index] = challenge;
        return challenge;
    }

    public async delete(id: string): Promise<void> {
        this.challenges = this.challenges.filter(
            (challenge) => challenge.id !== id
        );
    }
}
