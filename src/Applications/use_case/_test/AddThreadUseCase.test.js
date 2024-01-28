const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // arrange
    const mockThreadRepository = new ThreadRepository();
    const mockReturnAddedThread = new AddedThread({
      id: 'thread-123',
      title: 'this is title of thread',
      owner: 'user-123',
    });

    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockReturnAddedThread));

    const useCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const useCasePayload = {
      title: 'this is title of thread',
      body: 'this is body of thread',
      owner: 'user-123',
    };

    const expectedAddedThread = new AddedThread({
      id: 'thread-123',
      title: 'this is title of thread',
      owner: 'user-123',
    });

    // action
    const addedThread = await useCase.execute(useCasePayload);

    // assert
    expect(addedThread).toEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
  });
});
