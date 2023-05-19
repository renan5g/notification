import { NotificationsRepository } from '@app/repositories';
import { NotificationNotFound } from './errors';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
