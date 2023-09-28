import { useEffect, useState } from "react"

interface dataI{
  error: boolean;
  message:[]
}

export const useFetchData = (url: string) => {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState();

  const fetchData = async () => {
      try {
        const res = await fetch(url)

        const data = await res.json()
        setData(data)
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
        setError(error as any)
      }
    }

  useEffect(() => { 
    fetchData()
  }, [])
  
  return {data,loading,error,fetchData}
}