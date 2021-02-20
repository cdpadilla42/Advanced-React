import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'Chris',
    price: 9001,
    description: 'Cool guy',
  });

  return (
    <form>
      <label htmlFor="name">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        <input
          type="number"
          name="price"
          id="price"
          placeholder="price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        <input
          type="text"
          name="description"
          id="description"
          placeholder="description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>
      <input type="button" value="Reset Form" onClick={resetForm} />
      <input type="button" value="Clear Form" onClick={clearForm} />
    </form>
  );
}
