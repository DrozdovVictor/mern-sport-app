interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Sport Club</h1>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
