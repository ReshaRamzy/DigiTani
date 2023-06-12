package com.example.myapplication.ui.onboarding

import android.graphics.drawable.Drawable
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import com.example.myapplication.R
import com.example.myapplication.databinding.FragmentOnBoardingBinding

class OnBoardingFragment : Fragment() {
    private lateinit var binding : FragmentOnBoardingBinding

    override fun onCreateView(
        inflater : LayoutInflater ,
        container : ViewGroup? ,
        savedInstanceState : Bundle?
    ) : View {
        binding = FragmentOnBoardingBinding.inflate(inflater, container , false)
        return binding.root
    }

    override fun onViewCreated(view : View , savedInstanceState : Bundle?) {
        val position = requireArguments().getInt(ARG_POSITION)
        val onBoardingTitle = requireContext().resources.getStringArray(R.array.on_boarding_titles)
        val onBoardingDescription = requireContext().resources.getStringArray(R.array.on_boarding_description)
        val onBoardingImage = getOnBoardingImageAssets()
        with(binding){
            ivOnboarding.setImageDrawable(onBoardingImage[position])
            tvTitleOnboarding.text = onBoardingTitle[position]
            tvDescriptionOnboarding.text= onBoardingDescription[position]

        }
    }

    private fun getOnBoardingImageAssets() : List<Drawable> {
        val drawable: MutableList<Drawable> = ArrayList()

        drawable.add(ContextCompat.getDrawable(requireContext() , R.drawable.welcomescreen)!!)
        drawable.add(ContextCompat.getDrawable(requireContext() , R.drawable.onboarding_page1)!!)
        drawable.add(ContextCompat.getDrawable(requireContext() , R.drawable.onboarding_page2)!!)
        drawable.add(ContextCompat.getDrawable(requireContext() , R.drawable.onboarding_page3)!!)
        drawable.add(ContextCompat.getDrawable(requireContext() , R.drawable.onboarding_page4)!!)

        return drawable
    }

    companion object {
        private const val ARG_POSITION = "ARG_POSITION"

        fun getInstance(position: Int) = OnBoardingFragment().apply {
            arguments = bundleOf(ARG_POSITION to position)
        }
    }
}