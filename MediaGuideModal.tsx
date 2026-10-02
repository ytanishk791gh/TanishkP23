import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Folder, 
  Check, 
  Lock,
  Unlock,
  KeyRound,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { defaultHeroPhotoPath } from '../data/portfolioData';

interface MediaGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadHeroPhoto: (fileUrl: string) => void;
  customHeroPhoto?: string | null;
}

export const MediaGuideModal: React.FC<MediaGuideModalProps> = ({
  isOpen,
  onClose,
  onUploadHeroPhoto,
  customHeroPhoto
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('t23_media_auth') === '1';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  // Reset inputs and errors when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setPasswordInput('');
      setErrorMessage('');
    } else {
      setIsUnlocked(sessionStorage.getItem('t23_media_auth') === '1');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'T@nishkP23EDIT') {
      setIsUnlocked(true);
      sessionStorage.setItem('t23_media_auth', '1');
      setErrorMessage('');
      setPasswordInput('');
    } else {
      setErrorMessage('Incorrect password. Please try again.');
    }
  };

  const handleLockMedia = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('t23_media_auth');
    setPasswordInput('');
    setErrorMessage('');
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onUploadHeroPhoto(previewUrl);
    }
  };

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const mediaStructure = [
    {
      category: 'Hero Profile Image',
      items: [
        { name: 'Active Hero Image URL', path: defaultHeroPhotoPath, desc: 'Current configured hero photo' },
        { name: 'Local Asset Slot', path: '/assets/tanishk-photo.png', desc: 'Alternative local file path' }
      ]
    },
    {
      category: 'Video Portfolio Files',
      items: [
        { name: 'video-1.mp4', path: '/assets/videos/video-1.mp4', desc: 'Cinematic Edit video' },
        { name: 'video-2.mp4', path: '/assets/videos/video-2.mp4', desc: 'Gym / Fitness Reel' },
        { name: 'video-3.mp4', path: '/assets/videos/video-3.mp4', desc: 'Advertisement Reel' },
        { name: 'video-4.mp4', path: '/assets/videos/video-4.mp4', desc: 'YouTube / Short-Form Edit' }
      ]
    },
    {
      category: 'Video Thumbnails',
      items: [
        { name: 'video-1.jpg', path: '/assets/thumbnails/video-1.jpg', desc: 'Cinematic thumbnail' },
        { name: 'video-2.jpg', path: '/assets/thumbnails/video-2.jpg', desc: 'Gym reel thumbnail' },
        { name: 'video-3.jpg', path: '/assets/thumbnails/video-3.jpg', desc: 'Ad reel thumbnail' },
        { name: 'video-4.jpg', path: '/assets/thumbnails/video-4.jpg', desc: 'Short-form thumbnail' }
      ]
    },
    {
      category: 'Graphic Design Showcase',
      items: [
        { name: 'design-1.jpg', path: '/assets/designs/design-1.jpg', desc: 'Photo Editing slot' },
        { name: 'design-2.jpg', path: '/assets/designs/design-2.jpg', desc: 'Graphic Design slot' },
        { name: 'design-3.jpg', path: '/assets/designs/design-3.jpg', desc: 'YouTube Thumbnail slot' },
        { name: 'design-4.jpg', path: '/assets/designs/design-4.jpg', desc: 'Social Media design slot' },
        { name: 'design-5.jpg', path: '/assets/designs/design-5.jpg', desc: 'Banner & Poster slot' },
        { name: 'design-6.jpg', path: '/assets/designs/design-6.jpg', desc: 'Logos & PNG designs slot' }
      ]
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==================================================== */}
        {/* CASE 1: LOCKED PASSWORD SCREEN                      */}
        {/* ==================================================== */}
        {!isUnlocked ? (
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800/80 bg-zinc-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    Enter Admin Password
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono-code">
                    Access restricted to administrator
                  </p>
                </div>
              </div>

              <button
                id="close-password-modal-btn"
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Password Form Body */}
            <form onSubmit={handlePasswordSubmit} className="p-8 sm:p-10 flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                <KeyRound className="w-8 h-8" />
              </div>

              <div className="max-w-md space-y-2">
                <h4 className="font-display font-bold text-2xl text-white">
                  Media Files Protected
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Please enter the admin password to access media management, live testing uploads, and asset path controls.
                </p>
              </div>

              <div className="w-full max-w-md space-y-3">
                <div className="relative">
                  <input
                    id="admin-password-input"
                    type="password"
                    autoFocus
                    placeholder="Password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white placeholder-zinc-500 text-sm font-mono-code transition-all outline-none"
                  />
                </div>

                {errorMessage && (
                  <div className="flex items-center justify-center gap-2 text-rose-400 text-xs font-medium bg-rose-500/10 border border-rose-500/20 py-2.5 px-4 rounded-xl animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  id="submit-media-password-btn"
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all cursor-pointer"
                >
                  ACCESS MEDIA FILES
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-800/80 bg-zinc-950 flex items-center justify-between text-xs text-zinc-500 font-mono-code">
              <span>Security Protected</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ==================================================== */
          /* CASE 2: UNLOCKED EXISTING MEDIA FILES INTERFACE      */
          /* ==================================================== */
          <>
            {/* Header with Lock Button */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800/80 bg-zinc-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <Folder className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-xl text-white">
                      Media File Structure & Guide
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono-code text-emerald-400">
                      <Unlock className="w-3 h-3" />
                      <span>Unlocked</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono-code">
                    Easily replace media files without changing code
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="lock-media-files-btn"
                  onClick={handleLockMedia}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-300 border border-zinc-800 hover:border-rose-500/30 text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Lock Media Files"
                >
                  <Lock className="w-3.5 h-3.5 text-orange-400" />
                  <span>LOCK MEDIA FILES</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-300">
              
              {/* Quick Browser Test Upload for Hero Photo */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-zinc-900 to-zinc-900 border border-orange-500/30">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono-code text-orange-400 uppercase font-semibold block mb-1">
                      Live Preview Test
                    </span>
                    <h4 className="font-display font-bold text-base text-white">
                      Test Your Hero Photo Instantly
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Upload an image from your computer to see how your real photo looks in the 3D hero section right now!
                    </p>
                  </div>

                  <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg transition-all shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {customHeroPhoto && (
                  <div className="mt-3 flex items-center gap-2 text-xs font-mono-code text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Custom hero photo loaded for this session!</span>
                  </div>
                )}
              </div>

              {/* Centralized File Path Matrix */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider font-mono-code">
                  Asset Directory Breakdown
                </h4>

                {mediaStructure.map((section) => (
                  <div key={section.category} className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-4">
                    <div className="text-xs font-mono-code text-orange-400 font-bold uppercase tracking-wider mb-3">
                      {section.category}
                    </div>

                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <div 
                          key={item.path}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                        >
                          <div>
                            <div className="font-mono-code text-xs text-white font-medium">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-zinc-400">
                              {item.desc}
                            </div>
                          </div>

                          <button
                            onClick={() => copyPath(item.path)}
                            className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-[11px] font-mono-code text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
                          >
                            {copiedPath === item.path ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <span>Copy Path</span>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-800/80 bg-zinc-950 flex items-center justify-between text-xs text-zinc-400 font-mono-code">
              <span>All media items can be added into the `/assets/` directory.</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLockMedia}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-orange-400 font-medium hover:bg-zinc-800 flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3" />
                  <span>LOCK MEDIA FILES</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium hover:bg-zinc-800"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

