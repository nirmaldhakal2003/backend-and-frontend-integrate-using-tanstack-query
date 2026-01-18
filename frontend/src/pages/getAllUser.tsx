import React from "react";
import { AlertCircle, Loader2, UserPlus } from "lucide-react";
import { useGetAllUsers } from "../hooks/useCreateuser";

const Users = () => {
  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const {
    data: users,
    isPending,
    isSuccess,
    error,
    refetch,
  } = useGetAllUsers(page, perPage);

  const handleGetUsers = () => {
    setPage(1);
    refetch();
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    refetch();
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      refetch();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-800 rounded-2xl mb-4 shadow-lg ">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">All Users</h1>
            <button
              onClick={handleGetUsers}
              className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              Get All Users
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {isPending && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6 animate-spin">
                  <Loader2 className="w-10 h-10 text-blue-500" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Loading Users...
                </h2>
                <p className="text-gray-600 mb-8">
                  Please wait while we fetch the user list.
                </p>
              </div>
            )}
            {error && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-6">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Error Loading Users
                </h2>
                <p className="text-red-600">
                  {error instanceof Error ? error.message : "An error occurred"}
                </p>
              </div>
            )}
            {isSuccess && users && Array.isArray(users) && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  {users.length > 0 ? (
                    users.map(
                      (user: {
                        name?: string;
                        email?: string;
                        id?: string;
                      }) => (
                        <div
                          key={user.id}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <p className="font-semibold text-gray-800">
                            {user.name || "N/A"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {user.email || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            ID: {user.id || "N/A"}
                          </p>
                        </div>
                      ),
                    )
                  ) : (
                    <p className="text-center text-gray-600">No users found</p>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-gray-700 font-semibold">
                    Page {page} (Per Page: {perPage})
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={users.length < perPage}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Users;
