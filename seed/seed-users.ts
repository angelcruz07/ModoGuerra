interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const users: User[] = [
  {
    id: "A7B9C2D3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758494802/codequest25/users/alice_cjxas5.webp",
  },
  {
    id: "F4G8H1J2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758494802/codequest25/users/bob_zbaoa9.webp",
  },
  {
    id: "K5L6M7N8",
    name: "Carlos Rivera",
    email: "carlos.rivera@example.com",
    image:
      "https://res.cloudinary.com/dlklqucye/image/upload/v1758494803/codequest25/users/carlos_artqvk.webp",
  },
];
