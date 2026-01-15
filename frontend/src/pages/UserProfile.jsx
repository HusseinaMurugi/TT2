// User profile page - view other users' profiles
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import api from '../utils/api';

const UserProfile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, [userId]);

  const loadUserProfile = async () => {
    try {
      const [userRes, postsRes, followersRes, followingRes] = await Promise.all([
        api.get(`/users/${userId}`),
        api.get(`/users/${userId}/posts`),
        api.get(`/users/${userId}/followers`),
        api.get(`/users/${userId}/following`),
      ]);
      setUser(userRes.data);
      setPosts(postsRes.data);
      setFollowers(followersRes.data);
      setFollowing(followingRes.data);
      
      // Check if following only if logged in
      if (currentUser) {
        const isFollowingRes = await api.get(`/users/${userId}/is-following`);
        setIsFollowing(isFollowingRes.data.is_following);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await api.delete(`/users/${userId}/follow`);
        setIsFollowing(false);
      } else {
        await api.post(`/users/${userId}/follow`);
        setIsFollowing(true);
      }
      loadUserProfile();
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="app-bg min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="card-dark p-6 mb-6">
          <div className="flex items-start gap-6">
            <img
              src={user.profile_pic || 'https://via.placeholder.com/100'}
              alt={user.username}
              className="avatar w-24 h-24"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{user.username}</h1>
              <p className="text-[#8b949e]">{user.email}</p>
              <p className="mt-2 text-white">{user.bio || 'No bio'}</p>
              
              {currentUser && currentUser.id !== user.id && (
                <button
                  onClick={handleFollow}
                  className={`mt-3 px-6 py-2 rounded ${
                    isFollowing
                      ? 'btn-secondary'
                      : 'btn-primary'
                  }`}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              )}
              
              <div className="flex gap-6 mt-4 text-white">
                <div>
                  <span className="font-bold">{posts.length}</span> Posts
                </div>
                <div>
                  <span className="font-bold">{followers.length}</span> Followers
                </div>
                <div>
                  <span className="font-bold">{following.length}</span> Following
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-white">Posts</h2>
        {posts.length === 0 ? (
          <div className="card-dark p-8 text-center text-[#c9d1d9]">
            No posts yet.
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => <PostCard key={post.id} post={post} onUpdate={loadUserProfile} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
