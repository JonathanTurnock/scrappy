import { Observable, Subject } from "rxjs"

export type IuseSubjectCallbacks<T> = {
  next: (value?: T) => void
}

export const useSubject = <T>(): [Observable<T>, IuseSubjectCallbacks<T>] => {
  const subject = new Subject<T>()

  const next = (value?: T) => {
    subject.next(value)
  }

  return [subject, { next }]
}
