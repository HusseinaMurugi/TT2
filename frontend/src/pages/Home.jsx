// Home feed page - shows public posts or personalized feed
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import OnboardingModal from '../components/OnboardingModal';
import api from '../utils/api';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]);
  const [trendingUsers, setTrendingUsers] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    loadFeed();
    loadTrending();
    if (user) {
      loadSuggestedUsers();
      const shouldShowOnboarding = localStorage.getItem('showOnboarding');
      if (shouldShowOnboarding === 'true') {
        setShowOnboarding(true);
        localStorage.removeItem('showOnboarding');
      }
    }
  }, [user]);

  const loadFeed = async () => {
    try {
      const endpoint = user ? '/feed' : '/feed/public';
      const response = await api.get(endpoint);
      setPosts(response.data);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSuggestedUsers = async () => {
    try {
      const response = await api.get('/users/suggested');
      setSuggestedUsers(response.data);
    } catch (error) {
      console.error('Error loading suggested users:', error);
    }
  };

  const loadTrending = async () => {
    try {
      const [tagsRes, usersRes] = await Promise.all([
        api.get('/trending/tags'),
        api.get('/trending/users')
      ]);
      setTrendingTags(tagsRes.data);
      setTrendingUsers(usersRes.data);
    } catch (error) {
      console.error('Error loading trending:', error);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await api.post('/posts', { 
        content: newPost,
        image_url: imagePreview || '',
        tags: tags
      });
      setNewPost('');
      setTags('');
      setImageFile(null);
      setImagePreview('');
      loadFeed();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-xl text-blue-600 font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app-bg">
      {showOnboarding && <OnboardingModal user={user} onClose={() => setShowOnboarding(false)} />}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              {user ? '🌟 Your Feed' : '🔥 Trending Posts'}
            </h1>

            {/* Create post form */}
            {user && (
              <div className="card-dark p-6 mb-6">
                <form onSubmit={handleCreatePost}>
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind?"
                    className="input mb-3 resize-none"
                    rows="3"
                  />
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (e.g., #javascript #react)"
                    className="input mb-3"
                  />
                  {imagePreview && (
                    <div className="mb-3 relative">
                      <img src={imagePreview} alt="Preview" className="w-full rounded-xl max-h-64 object-cover" />
                      <button
                        type="button"
                        onClick={() => { setImageFile(null); setImagePreview(''); }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-[#1f3b5c] hover:bg-[#2b4c6f] px-4 py-2 rounded-lg transition flex items-center gap-2">
                      <span>📷</span>
                      <span className="font-medium">Add Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Login prompt */}
            {!user && (
              <div className="card-dark p-6 mb-6 border-2 border-[#1f6feb]">
                <h2 className="text-2xl font-bold mb-2">🚀 Join TechTalk Today!</h2>
                <p className="mb-4 text-[#c9d1d9]">Connect with developers, share ideas, and grow together.</p>
                <div className="flex gap-3">
                  <Link to="/login" className="btn-secondary">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary">
                    Sign Up Free
                  </Link>
                </div>
              </div>
            )}

            {/* Posts list */}
            {posts.length === 0 ? (
              <div className="card-dark p-12 text-center">
                <div className="text-6xl mb-4">📢</div>
                <p className="text-[#c9d1d9] text-lg">No posts yet. Be the first to share!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => <PostCard key={post.id} post={post} onUpdate={loadFeed} />)}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Tags */}
            {!user && trendingTags.length > 0 && (
              <div className="card-dark p-6">
                <h2 className="text-xl font-bold mb-4">🔥 Trending Tags</h2>
                <div className="space-y-2">
                  {trendingTags.map((tag, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-[#1f3b5c]/50 rounded-lg transition">
                      <span className="text-[#1f6feb] font-semibold">#{tag.tag}</span>
                      <span className="text-sm text-[#8b949e]">{tag.count} posts</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Users */}
            {!user && trendingUsers.length > 0 && (
              <div className="card-dark p-6">
                <h2 className="text-xl font-bold mb-4">⭐ Top Users</h2>
                <div className="space-y-4">
                  {trendingUsers.map((trendingUser) => (
                    <Link 
                      key={trendingUser.id}
                      to={`/users/${trendingUser.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1f3b5c]/50 transition"
                    >
                      <img
                        src={trendingUser.profile_pic || 'https://via.placeholder.com/40'}
                        alt={trendingUser.username}
                        className="avatar w-12 h-12"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{trendingUser.username}</p>
                        <p className="text-sm text-[#8b949e]">{trendingUser.followers_count} followers</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Users */}
            {user && suggestedUsers.length > 0 && (
              <div className="card-dark p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">👥 Who to Follow</h2>
                <div className="space-y-4">
                  {suggestedUsers.map((suggestedUser) => (
                    <Link 
                      key={suggestedUser.id}
                      to={`/users/${suggestedUser.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1f3b5c]/50 transition"
                    >
                      <img
                        src={suggestedUser.profile_pic || 'https://via.placeholder.com/40'}
                        alt={suggestedUser.username}
                        className="avatar w-12 h-12"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{suggestedUser.username}</p>
                        <p className="text-sm text-[#8b949e] truncate">{suggestedUser.bio || 'Tech enthusiast'}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
