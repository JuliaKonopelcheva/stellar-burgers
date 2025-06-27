import { FC, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isModal = location.state && location.state.backgroundLocation;
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const loading = useAppSelector(
    (state) => state.ingredients.ingredientsRequest
  );
  const error = useAppSelector((state) => state.ingredients.ingredientsFailed);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const ingredientData = ingredients.find((item) => item._id === id);

  if (loading) return <Preloader />;
  if (error) return <div>Ошибка загрузки ингредиентов</div>;
  if (!ingredientData) return <div>Ингредиент не найден</div>;

  const content = (
    <>
      <h2
        className='text text_type_main-large mt-10 mb-6'
        style={{ textAlign: 'center' }}
      >
        Детали ингредиента
      </h2>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </>
  );

  return isModal ? (
    content
  ) : (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {content}
    </div>
  );
};
