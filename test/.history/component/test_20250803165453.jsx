const Test = () => {
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product name" />
        <input type="number" name="price" placeholder="Product price" />
        <input type="text" name="category" placeholder="Product category" />
        <input
          type="text"
          name="description"
          placeholder="Product description"
        />
      </form>
    </div>
  );
};

export default Test;
