import { describe, expect, it } from 'vitest';

import { makeNotification } from '@test/factories';
import { InMemoryNotificationsRepository } from '@test/repositories';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notification,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date)
    );
  });
});
