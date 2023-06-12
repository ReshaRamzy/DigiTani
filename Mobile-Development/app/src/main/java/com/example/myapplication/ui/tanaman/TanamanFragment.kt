package com.example.myapplication.ui.tanaman

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.myapplication.R

class TanamanFragment : Fragment() {
    private lateinit var viewModel : TanamanViewModel

    override fun onCreateView(
        inflater : LayoutInflater , container : ViewGroup? ,
        savedInstanceState : Bundle?
    ) : View? {
        // Inflate the layout for this fragment
        viewModel = ViewModelProvider(this)[TanamanViewModel::class.java]
        val root =  inflater.inflate(R.layout.fragment_tanaman , container , false)

        val textView: TextView = root.findViewById(R.id.textTanaman)
        viewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }
        return root
    }
}