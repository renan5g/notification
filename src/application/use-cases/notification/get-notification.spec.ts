import { describe, expect, it } from 'vitest';

import { NotificationNotFound } from '@application/use-cases/errors';
import { makeNotification } from '@test/factories';
import { InMemoryNotificationsRepository } from '@test/repositories';
import { GetNotification } from './get-notification';

describe('Get notification', () => {
  it('should be able to get a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getNotification = new GetNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    const result = await getNotification.execute({
      notificationId: notification.id.toString(),
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(
      result.notification
    );
  });

  it('should not be able to get a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getNotification = new GetNotification(notificationsRepository);

    expect(() => {
      return getNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
