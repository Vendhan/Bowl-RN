class FoodModel {
  id: number;
  title: string;
  imageUrl: string;
  origin: string;
  description: string;
  isWishlisted: Boolean;
  history: string;
  cookingInstructions: string[];

  constructor(
    id: number,
    title: string,
    imageUrl: string,
    origin: string,
    description: string,
    isWishlisted: Boolean,
    history: string,
    cookingInstructions: string[],
  ) {
    this.id = id;
    this.title = title;
    this.origin = origin;
    this.imageUrl = imageUrl;
    this.description = description;
    this.isWishlisted = isWishlisted;
    this.history = history;
    this.cookingInstructions = cookingInstructions;
  }
}

export default FoodModel;
