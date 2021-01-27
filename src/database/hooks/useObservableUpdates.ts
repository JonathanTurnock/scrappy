import { Observable } from "rxjs"
import { useEffect, useState } from "react"

export const useObservableUpdates = (observable: Observable<any>) => {
  const [render, setRender] = useState<number>(new Date().getTime())

  useEffect(() => {
    const sxn = observable.subscribe(() => {
      setRender(new Date().getTime())
    })
    return () => {
      sxn.unsubscribe()
    }
  }, [observable])

  return { render, setRender }
}
