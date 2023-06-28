import { Entity, UniqueEntityID } from '@core/entities';
import { Content } from './content';

import { Optional } from '@core/types';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Notification extends Entity<NotificationProps> {
  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updateAt(): Date {
    return this.props.createdAt;
  }

  public read() {
    this.props.readAt = new Date();
    this.touch();
  }

  public unread() {
    this.props.readAt = null;
    this.touch();
  }

  public cancel() {
    this.props.canceledAt = new Date();
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<NotificationProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id
    );

    return notification;
  }
}
