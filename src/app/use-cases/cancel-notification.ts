import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { NotificationNotFound } from '@app/use-cases/errors';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
