import { makeNotification } from '@test/factories';
import { InMemoryNotificationsRepository } from '@test/repositories';
import { CancelNotification } from './cancel-notification';

import { describe, expect, it } from 'vitest';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notification,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    );
  });
});
