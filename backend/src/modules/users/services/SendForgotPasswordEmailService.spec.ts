import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUsersTokenRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@test.com.br',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'email@test.com.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to reset a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'email@test.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@test.com.br',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'email@test.com.br',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
