import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@test.com.br',
      password: '123456',
    });

    const profileUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profileUser.name).toBe('John Doe');
    expect(profileUser.email).toBe('email@test.com.br');
  });

  it('should not be able to show the profile from non existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
