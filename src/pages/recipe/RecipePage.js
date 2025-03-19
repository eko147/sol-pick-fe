import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './RecipePage.css';
import Header from '../../components/common/header/Header';
import Menu from '../../components/common/menu/Menu';
import RecipeNotebook from '../../components/recipe/RecipeNotebook';
import backArrow from '../../assets/backArrow.svg';
import { recipeApi } from '../../api/RecipeApi';

import plateLoadingGif from '../../assets/recipe/plate-loading.gif';

const LoadingGif = () => {
    return (
        <div className="recipe-page-loading-container">
            <div className="loading-content">
                <img
                    src={plateLoadingGif}
                    alt="Loading"
                    className="loading-gif"
                />
                {/* <h3 className="loading-text">레시피를 준비하고 있어요...</h3>
                <p className="loading-subtext">맛있는 요리가 곧 시작됩니다!</p> */}
                {/* <p>맛있는 요리가 곧 시작됩니다!</p> */}
            </div>
        </div>
    );
};
const RecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // 페이보릿 페이지에서 전달받은 레시피 기본 정보 (있는 경우)
    const initialRecipe = location.state?.recipe || null;

    const [recipe, setRecipe] = useState(initialRecipe ? {
        ...initialRecipe,
        steps: [] // 스텝 정보는 API에서 별도로 가져올 예정
    } : null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 레시피 스텝 정보 가져오기
    useEffect(() => {
        const fetchRecipeSteps = async () => {
            if (!id) return;

            const startTime = Date.now();

            try {
                // 레시피 스텝 정보 가져오기
                const steps = await recipeApi.getRecipeSteps(id);

                // 최소 로딩 시간 보장 (최소 1.5초)
                const elapsedTime = Date.now() - startTime;
                const minimumLoadingTime = 1500;

                if (elapsedTime < minimumLoadingTime) {
                    await new Promise(resolve => setTimeout(resolve, minimumLoadingTime - elapsedTime));
                }

                // 레시피 객체 업데이트
                setRecipe(prevRecipe => {
                    // 기존 레시피 정보가 있으면 스텝 정보만 추가
                    if (prevRecipe) {
                        return {
                            ...prevRecipe,
                            steps
                        };
                    }
                    // 기존 레시피 정보가 없으면 기본 정보만 포함한 새 객체 생성
                    return {
                        id,
                        name: `레시피 #${id}`, // 이름 정보가 없을 경우 기본값
                        mainImage: '/images/default-recipe.png', // 기본 이미지
                        steps
                    };
                });

                setLoading(false);
            } catch (error) {
                console.error("레시피 스텝 로드 중 오류:", error);
                setError("레시피 정보를 불러오는데 실패했습니다.");
                setLoading(false);
            }
        };

        fetchRecipeSteps();
    }, [id]);

    // 뒤로가기 핸들러
    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="recipe-page-container">
                <Header
                    leftIcon={backArrow}
                    title="레시피"
                    onLeftClick={handleGoBack}
                />
                <LoadingGif />
                <Menu />
            </div>
        );
    }

    if (error) {
        return (
            <div className="recipe-page-container">
                <Header
                    leftIcon={backArrow}
                    title="레시피"
                    onLeftClick={handleGoBack}
                />
                <div className="recipe-page-error">
                    <p>{error}</p>
                </div>
                <Menu />
            </div>
        );
    }

    return (
        <div className="recipe-page-container">
            <Header
                leftIcon={backArrow}
                title={recipe ? recipe.name : "레시피"} // 레시피 이름을 헤더 타이틀로 사용
                onLeftClick={handleGoBack}
            />

            <div className="recipe-page-content">
                {recipe && <RecipeNotebook recipe={recipe} />}
            </div>

            <Menu />
        </div>
    );
};

export default RecipePage;