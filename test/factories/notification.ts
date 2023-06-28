import { UniqueEntityID } from '@core/entities';
import { Content } from '@domain/entities/notification/content';
import {
  Notification,
  NotificationProps,
} from '@domain/entities/notification/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID
) {
  return Notification.create(
    {
      category: 'social',
      content: Content.create('Nova solicitação de amizade!'),
      recipientId: 'recipient-2',
      ...override,
    },
    id
  );
}
