import { useEffect, useState } from 'react'
import {
  fetchInstaPosts,
  fetchInstaProfile,
} from 'libs/services/api/instagram.api'

const useInstagramPosts = (accessToken, instaId) => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})

  const getPosts = () => {
    fetchInstaPosts(accessToken, instaId)
      .then(res => {
        if (res.data.data) {
          setPosts([...res.data.data])
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const getUser = () => {
    fetchInstaProfile(accessToken, instaId)
      .then(res => {
        setUser({
          name: res.data.name,
          profilePic: res.data.profile_picture_url,
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    getPosts()
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { posts, user }
}

export default useInstagramPosts
