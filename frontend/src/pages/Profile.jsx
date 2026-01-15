// Profile page - shows user's own profile with edit capability
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import api from '../utils/api';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [profilePic, setProfilePic] = useState(user?.profile_pic || '');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const [postsRes, followersRes, followingRes] = await Promise.all([
        api.get(`/users/${user.id}/posts`),
        api.get(`/users/${user.id}/followers`),
        api.get(`/users/${user.id}/following`),
      ]);
      setPosts(postsRes.data);
      setFollowers(followersRes.data);
      setFollowing(followingRes.data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/profile', { bio, profile_pic: profilePic });
      updateUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Profile header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start gap-6">
            <img
              src={user?.profile_pic || 'https://via.placeholder.com/100'}
              alt={user?.username}
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user?.username}</h1>
              <p className="text-gray-600">{user?.email}</p>
              
              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="mt-4">
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      rows="3"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Profile Picture URL</label>
                    <input
                      type="text"
                      value={profilePic}
                      onChange={(e) => setProfilePic(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="mt-2 text-gray-700">{user?.bio || 'No bio yet'}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit Profile
                  </button>
                </>
              )}
              
              <div className="flex gap-6 mt-4">
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

        {/* User's posts */}
        <h2 className="text-xl font-bold mb-4">Your Posts</h2>
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            You haven't posted anything yet.
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} onUpdate={loadProfile} />)
        )}
      </div>
    </div>
  );
};

export default Profile;
