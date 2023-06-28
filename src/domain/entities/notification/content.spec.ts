import { describe, expect, it } from 'vitest';
import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = Content.create('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => Content.create('aaa')).toThrow();
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => Content.create('a'.repeat(241))).toThrow();
  });
});
