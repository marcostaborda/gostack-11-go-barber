import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should not be able to update the user from non existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user',
        name: 'John Tre',
        email: 'jhon@test.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@test.com.br',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'jhon@test.com.br',
    });

    expect(updateUser.name).toBe('John Tre');
    expect(updateUser.email).toBe('jhon@test.com.br');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@test.com.br',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'TESTE',
      email: 'teste@teste.com.br',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'email@test.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@test.com.br',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'jhon@test.com.br',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@test.com.br',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'jhon@test.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@test.com.br',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'jhon@test.com.br',
        password: '123123',
        old_password: 'worng-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
