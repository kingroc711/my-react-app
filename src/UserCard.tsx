type UserProps = {
  name: string;
  age: number;
  email: string;
};

function UserCard(props: UserProps) {
  return (
    <div style={{ border: "1px solid gray", margin: "5px", padding: "10px" }}>
      <h3>{props.name}</h3>
      <p>年龄: {props.age}</p>
      <p>邮箱: {props.email}</p>
    </div>
  );
}

export default UserCard;
