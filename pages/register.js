import Head from "next/head";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import { useRouter } from "next/router";
import { useAppContext } from "./auth";

export default function Register() {
  const storage = getStorage();
  const auth = getAuth();
  const router = useRouter();
  const authuser = useAppContext();

  if (authuser) router.push("/");

  const [query, setQuery] = useState({
    name: "",
    email: "",
    phone: "",
    userImage: "",
    id: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      query.name.length > 0 &&
      query.email.length > 0 &&
      query.phone.length > 0 &&
      query.password.length > 0 &&
      query.phone.length > 0
    ) {
      const storageRef = ref(storage, `${query.name}/image.jpg`);
      let url = "";

      await uploadBytes(storageRef, query.userImage);

      url = await getDownloadURL(storageRef);

      const value = query.name
        .split(" ")
        .filter((x) => x.toLowerCase())
        .join("-");

      const data = {
        mutations: [
          {
            create: {
              _type: "person",
              name: query.name,
              id: value,
              email: query.email,
              phone: query.phone,
              userImage: url,
            },
          },
        ],
      };

      let response = await fetch(
        "https://i1ho5kfq.api.sanity.io/v2021-06-07/data/mutate/production",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer skAl0p21xCw7PBFqB4uT73M5wNVYV0gnmWcPeT7GHnjeWIJWOY9K1EkoV5Gl2zdRo1Dh9uzt87Vx3KRU6sXY760QLYLtMim5fdHLXOJOg1FU91xVMIGAjaLYZoqky6dQgtPuvfZwCM5KtF4Waz4K6mNTEWVtDLfmqTcZNMd4RUd6LW6CfVv4",
          },
          body: JSON.stringify(data),
        }
      );

      let result = await response.json();
      console.log(result);
      await createUserWithEmailAndPassword(auth, query.email, query.password);
      router.push("/");
    }
  }

  function handleFileChange(e) {
    const value = e.target.files[0];
    setQuery((prev) => ({
      ...prev,
      userImage: value,
    }));
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="w-11/12 lg:w-8/12 height mx-auto flex items-center justify-center">
      <Head>
        <title>Register Page</title>
      </Head>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="w-full lg:w-2/5 h-9/12 border-2 rounded-lg flex flex-col shadow-md"
      >
        <p className="text-center text-3xl font-bold p-4">Register</p>
        <p className="w-10/12 text-xl mx-auto my-2">Email</p>
        <input
          onChange={handleChange}
          name="email"
          className="mx-auto w-10/12 p-1 border-2 border-gray-300 rounded-sm"
          type="text"
        />
        <p className="w-10/12 text-xl mx-auto my-2">Name</p>
        <input
          onChange={handleChange}
          name="name"
          className="mx-auto w-10/12 p-1 border-2 border-gray-300 rounded-sm"
          type="text"
        />
        <p className="w-10/12 text-xl mx-auto my-2">Phone No:</p>
        <input
          onChange={handleChange}
          name="phone"
          className="mx-auto w-10/12 p-1 border-2 border-gray-300 rounded-sm"
          type="text"
        />
        <p className="w-10/12 text-xl mx-auto my-2">Profile Picture</p>
        <input
          name="userImage"
          onChange={handleFileChange}
          className="mx-auto w-10/12 p-1 border-2 border-gray-300 rounded-sm"
          accept="image/png, image/jpeg"
          type="file"
        />
        <p className="w-10/12 text-xl mx-auto my-2">Password</p>
        <input
          onChange={handleChange}
          name="password"
          className="mx-auto w-10/12 p-1 border-2 border-gray-300 rounded-sm"
          type="password"
        />
        <div className="w-10/12 mx-auto py-5 flex">
          <input
            className="hover:bg-gray-300 hover:text-black cursor-pointer rounded-md px-3 py-2 bg-black text-white"
            value="Register"
            type="submit"
          />
          <button
            className="hover:bg-gray-300 hover:text-black ml-auto rounded-md px-3 py-2 bg-black text-white"
            onClick={() => router.push("/login")}
          >
            Already have account?
          </button>
        </div>
      </form>
    </div>
  );
}
