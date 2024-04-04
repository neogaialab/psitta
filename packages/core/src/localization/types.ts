export type Locale = string

// #region Messages

export type Message = string
export type LocalizedMessage = string

export type Translation = Message
export type Translations = Record<Locale, Translation>
export type Messages = Record<Message, Translations>

export interface Register { }

export type AnyMessages = Messages

export type RegisteredMessages = Register extends {
  messages: infer TMessages extends AnyMessages
}
  ? TMessages
  : AnyMessages

// #endregion

export { }
